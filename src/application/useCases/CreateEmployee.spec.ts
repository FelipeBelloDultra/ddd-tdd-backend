// Imports
import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";

// Repositories
import { FakeEmployeeRepository } from "~/application/repository/fakes/FakeEmployeeRepository";
import { FakeBarbershopRepository } from "~/application/repository/fakes/FakeBarbershopRepository";

// Domain
import { Employee } from "~/domain/entity/Employee";
import { Barbershop } from "~/domain/entity/Barbershop";

// Use case
import { CreateEmployee } from "./CreateEmployee";

describe("CreateEmployee", () => {
  let createEmployee: CreateEmployee;
  let fakeEmployeeRepository: FakeEmployeeRepository;
  let fakeBarbershopRepository: FakeBarbershopRepository;
  let barbershop: Barbershop;

  beforeEach(async () => {
    fakeEmployeeRepository = new FakeEmployeeRepository();
    fakeBarbershopRepository = new FakeBarbershopRepository();
    barbershop = await fakeBarbershopRepository.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      id: faker.string.uuid(),
    });

    createEmployee = new CreateEmployee(
      fakeEmployeeRepository,
      fakeBarbershopRepository
    );
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

  it("should not be able to create Employee if email already used", async () => {
    const email = faker.internet.email();

    const employee = new Employee({
      name: faker.person.fullName(),
      email: email,
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop._id,
    });

    await fakeEmployeeRepository.create({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatarUrl: employee.avatarUrl,
      barbershopId: employee.barbershopId,
      id: employee._id,
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
});
