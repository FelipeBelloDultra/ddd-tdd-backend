import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Client } from "@modules/client/domain/Client";
import { CreateClient } from "./CreateClient";
import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createClient: CreateClient;

describe("CreateClient.ts", () => {
  beforeEach(() => {
    createClient = new CreateClient({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should create Client", async () => {
    const result = await createClient.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be able create Client if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.clientRepository.create(
      Client.create({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    );

    const result = await createClient.execute({
      name: faker.person.fullName(),
      email,
      password: faker.internet.password(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new ClientEmailAlreadyUsedError());
  });
});
