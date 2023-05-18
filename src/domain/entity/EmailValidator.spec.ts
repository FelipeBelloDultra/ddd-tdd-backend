// Packages
import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";

// Fake repository
import { FakeBarbershopRepository } from "~/repositories/fakes/FakeBarbershopRepository";
import { FakeEmployeeRepository } from "~/repositories/fakes/FakeEmployeeRepository";

// Domain
import { EmailValidator } from "./EmailValidator";
import { Employee } from "./Employee";
import { Barbershop } from "./Barbershop";

describe("EmailValidator.ts", () => {
  let fakeBarbershopRepository: FakeBarbershopRepository;
  let fakeEmployeeRepository: FakeEmployeeRepository;
  let emailValidator: EmailValidator;
  let barbershop: Barbershop;
  let employee: Employee;

  beforeEach(() => {
    fakeBarbershopRepository = new FakeBarbershopRepository();
    fakeEmployeeRepository = new FakeEmployeeRepository();

    barbershop = new Barbershop({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    employee = new Employee({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop._id,
    });

    emailValidator = new EmailValidator(
      fakeEmployeeRepository,
      fakeBarbershopRepository
    );
  });

  it("should verify if email is used by barbershop", async () => {
    await fakeBarbershopRepository.create({
      id: barbershop._id,
      name: barbershop.name,
      email: barbershop.email,
      password: barbershop.password,
    });

    const usedByBarbershop = await emailValidator.isEmailAlreadyUsed(
      barbershop.email
    );

    expect(usedByBarbershop).toBeTruthy();
  });

  it("should verify if email is used by employee", async () => {
    await fakeEmployeeRepository.create({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatarUrl: employee.avatarUrl,
      barbershopId: employee.barbershopId,
    });

    const usedByEmployee = await emailValidator.isEmailAlreadyUsed(
      employee.email
    );

    expect(usedByEmployee).toBeTruthy();
  });

  it("should pass if email is free", async () => {
    await expect(
      emailValidator.isEmailAlreadyUsed(faker.internet.email())
    ).resolves.toBeFalsy();
  });
});
