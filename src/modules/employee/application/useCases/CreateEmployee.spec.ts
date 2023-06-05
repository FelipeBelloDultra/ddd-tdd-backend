import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/BarbershopFactory";
import { EmployeeFactory } from "@test/factory/EmployeeFactory";

import { EmployeeEmailAlreadyUsedError } from "./errors/EmployeeEmailAlreadyUsedError";
import { EmployeeBarbershopNotFoundError } from "./errors/EmployeeBarbershopNotFoundError";

import { CreateEmployee } from "./CreateEmployee";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = BarbershopFactory.create();

let createEmployee: CreateEmployee;

describe("CreateEmployee.ts", () => {
  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    createEmployee = new CreateEmployee({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should create Employee", async () => {
    const result = await createEmployee.execute({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      avatarUrl: BaseFactory.makeAvatar(),
      barbershopId: barbershop.id,
      phone: BaseFactory.makePhone(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be able create Employee if barbershop is not found", async () => {
    const result = await createEmployee.execute({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      avatarUrl: BaseFactory.makeAvatar(),
      barbershopId: BaseFactory.makeUuid(),
      phone: BaseFactory.makePhone(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new EmployeeBarbershopNotFoundError());
  });

  it("should not be able create Employee if email already exists", async () => {
    const email = BaseFactory.makeEmail();

    await fakeRepositoryFactory.employeeRepository.create(
      EmployeeFactory.create({
        email,
        barbershopId: barbershop.id,
      })
    );

    const result = await createEmployee.execute({
      name: BaseFactory.makeFullName(),
      email,
      avatarUrl: BaseFactory.makeAvatar(),
      barbershopId: barbershop.id,
      phone: BaseFactory.makePhone(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new EmployeeEmailAlreadyUsedError());
  });
});
