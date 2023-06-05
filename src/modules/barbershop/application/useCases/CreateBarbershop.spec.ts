import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

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
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
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
    const barbershop = BarbershopFactory.create({});

    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    const result = await createBarbershop.execute({
      name: BaseFactory.makeFullName(),
      email: barbershop.email.value,
      password: BaseFactory.makePassword(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new BarbershopEmailAlreadyUsedError());
  });
});
