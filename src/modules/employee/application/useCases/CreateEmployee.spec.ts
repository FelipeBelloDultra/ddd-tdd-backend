import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Employee } from "@modules/employee/domain/Employee";
import { BarbershopFactory } from "@test/factory/BarbershopFactory";
import { CreateEmployee } from "./CreateEmployee";
import { EmployeeEmailAlreadyUsedError } from "./errors/EmployeeEmailAlreadyUsedError";
import { EmployeeBarbershopNotFoundError } from "./errors/EmployeeBarbershopNotFoundError";

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
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop.id,
      phone: faker.phone.number(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be able create Employee if barbershop is not found", async () => {
    const result = await createEmployee.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: faker.string.uuid(),
      phone: faker.phone.number(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new EmployeeBarbershopNotFoundError());
  });

  it("should not be able create Employee if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.employeeRepository.create(
      Employee.create({
        name: faker.person.fullName(),
        email: email,
        phone: faker.phone.number(),
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop.id,
      })
    );

    const result = await createEmployee.execute({
      name: faker.person.fullName(),
      email,
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop.id,
      phone: faker.phone.number(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new EmployeeEmailAlreadyUsedError());
  });
});
