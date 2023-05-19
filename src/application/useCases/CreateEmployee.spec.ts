// Imports
import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";

// Repository factory
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";

// Domain
import { Employee } from "~/domain/entity/Employee";
import { Barbershop } from "~/domain/entity/Barbershop";

// Use case
import { CreateEmployee } from "./CreateEmployee";

describe("CreateEmployee", () => {
  const fakeRepositoryFactory = new FakeRepositoryFactory();
  const barbershopRepository =
    fakeRepositoryFactory.createBarbershopRepository();
  const employeeRepository = fakeRepositoryFactory.createEmployeeRepository();

  let createEmployee: CreateEmployee;
  let barbershop: Barbershop;

  beforeEach(async () => {
    barbershop = await barbershopRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      _id: faker.string.uuid(),
    });

    createEmployee = new CreateEmployee({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
    });
  });

  it("should create Employee", async () => {
    const result = await createEmployee.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop._id,
      phone: faker.phone.number(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not be able to create Employee if email already used by other employee", async () => {
    const email = faker.internet.email();

    const employee = new Employee({
      name: faker.person.fullName(),
      email: email,
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop._id,
    });

    await employeeRepository.create({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatarUrl: employee.avatarUrl,
      barbershopId: employee.barbershopId,
      _id: employee._id,
    });

    await expect(
      createEmployee.execute({
        name: faker.person.fullName(),
        email,
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop._id,
        phone: faker.phone.number(),
      })
    ).rejects.toThrowError("Email already registered");
  });

  it("should not be able to create Employee if email already used by barbershop", async () => {
    await expect(
      createEmployee.execute({
        name: faker.person.fullName(),
        email: barbershop.email,
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop._id,
        phone: faker.phone.number(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
