// Packages
import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";

// Repository factory
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";

// Domain
import { Barbershop } from "~/domain/entity/Barbershop";
import { Employee } from "~/domain/entity/Employee";

// Use case
import { CreateBarbershop } from "./CreateBarbershop";

describe("CreateBarbershop.ts", () => {
  const fakeRepositoryFactory = new FakeRepositoryFactory();
  const barbershopRepository =
    fakeRepositoryFactory.createBarbershopRepository();
  const employeeRepository = fakeRepositoryFactory.createEmployeeRepository();

  let createBarbershop: CreateBarbershop;

  beforeEach(() => {
    createBarbershop = new CreateBarbershop({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
    });
  });

  it("should create Barbershop", async () => {
    const result = await createBarbershop.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not be able to create Barbershop if email already registered by other barbershop", async () => {
    const email = faker.internet.email();

    const barbershop = new Barbershop({
      name: faker.person.fullName(),
      email,
      password: faker.internet.password(),
    });

    await barbershopRepository.create({
      _id: barbershop._id,
      email,
      name: barbershop.name,
      password: barbershop.password,
    });

    await expect(
      createBarbershop.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });

  it("should not be able to create Barbershop if email already registered by employee", async () => {
    const email = faker.internet.email();

    const employee = new Employee({
      name: faker.person.fullName(),
      email,
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: faker.string.uuid(),
    });

    await employeeRepository.create({
      _id: employee._id,
      email: employee.email,
      name: employee.name,
      avatarUrl: employee.avatarUrl,
      barbershopId: employee.barbershopId,
      phone: employee.phone,
    });

    await expect(
      createBarbershop.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
