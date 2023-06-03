import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BarbershopFactory } from "@test/factory/BarbershopFactory";

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

  it("should not create Client with invalid data", async () => {
    const result = await createBarbershop.execute({
      name: "",
      email: "",
      password: "",
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be able create Barbershop if email already exists", async () => {
    const barbershop = BarbershopFactory.create();

    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    const result = await createBarbershop.execute({
      name: faker.person.fullName(),
      email: barbershop.email.value,
      password: faker.internet.password(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new BarbershopEmailAlreadyUsedError());
  });
});
