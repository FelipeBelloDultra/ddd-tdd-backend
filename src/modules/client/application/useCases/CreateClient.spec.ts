import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BaseFactory } from "@test/factory/BaseFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

import { CreateClient } from "./CreateClient";

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
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not create Client with invalid data", async () => {
    const result = await createClient.execute({
      name: "",
      email: "",
      password: "",
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be able create Client if email already exists", async () => {
    const client = ClientFactory.create({});

    await fakeRepositoryFactory.clientRepository.create(client);

    const result = await createClient.execute({
      name: BaseFactory.makeFullName(),
      email: client.email.value,
      password: BaseFactory.makePassword(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new ClientEmailAlreadyUsedError());
  });
});
