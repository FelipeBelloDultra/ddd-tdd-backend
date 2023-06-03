import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { Employee } from "@modules/employee/domain/Employee";
import { ClientFactory } from "@test/factory/ClientFactory";
import { EmailValidatorService } from "./EmailValidatorService";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let registredEmail: string;
let emailValidatorService: EmailValidatorService;

describe("EmailValidatorService.ts", () => {
  beforeEach(() => {
    registredEmail = faker.internet.email();

    emailValidatorService = new EmailValidatorService({
      barbershopRepository: fakeRepositoryFactory.barbershopRepository,
      clientRepository: fakeRepositoryFactory.clientRepository,
      employeeRepository: fakeRepositoryFactory.employeeRepository,
    });
  });

  it("should return false if email was not registred", async () => {
    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeFalsy();
  });

  it("should return true if email was registred by Client", async () => {
    await fakeRepositoryFactory.clientRepository.create(ClientFactory.create());

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return true if email was registred by Employee", async () => {
    await fakeRepositoryFactory.employeeRepository.create(
      Employee.create({
        name: faker.person.fullName(),
        email: registredEmail,
        avatarUrl: faker.internet.avatar(),
        phone: faker.phone.number(),
        barbershopId: faker.string.uuid(),
      })
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return true if email was registred by Barbershop", async () => {
    await fakeRepositoryFactory.barbershopRepository.create(
      Barbershop.create({
        name: faker.person.fullName(),
        email: registredEmail,
        password: faker.internet.password(),
      })
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });
});
