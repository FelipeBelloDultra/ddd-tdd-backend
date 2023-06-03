import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { Employee } from "@modules/employee/domain/Employee";

import { ClientFactory } from "@test/factory/ClientFactory";
import { BarbershopFactory } from "@test/factory/BarbershopFactory";
import { BaseFactory } from "@test/factory/BaseFactory";

import { EmailValidatorService } from "./EmailValidatorService";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let registredEmail: string;
let emailValidatorService: EmailValidatorService;

describe("EmailValidatorService.ts", () => {
  beforeEach(() => {
    registredEmail = BaseFactory.makeEmail();

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
        name: BaseFactory.makeFullName(),
        email: registredEmail,
        avatarUrl: BaseFactory.makeAvatar(),
        phone: BaseFactory.makePhone(),
        barbershopId: BaseFactory.makeUuid(),
      })
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return true if email was registred by Barbershop", async () => {
    await fakeRepositoryFactory.barbershopRepository.create(
      BarbershopFactory.create()
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });
});
