import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { CreateBarbershop } from "./CreateBarbershop";
import { BarbershopEmailAlreadyUsedError } from "./errors/BarbershopEmailAlreadyUsedError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createBarbershop: CreateBarbershop;

describe("CreateBarbershop.ts", () => {
  beforeEach(() => {
    createBarbershop = new CreateBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should create Barbershop", async () => {
    const result = await createBarbershop.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be able create Barbershop if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.barbershopRepository.create(
      Barbershop.create({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    );

    const result = await createBarbershop.execute({
      name: faker.person.fullName(),
      email,
      password: faker.internet.password(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new BarbershopEmailAlreadyUsedError());
  });
});
