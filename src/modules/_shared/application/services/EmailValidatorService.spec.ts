import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";
import { BaseFactory } from "@test/factory/BaseFactory";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

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
    await fakeRepositoryFactory.clientRepository.create(
      ClientFactory.create({})
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return true if email was registred by Employee", async () => {
    await fakeRepositoryFactory.employeeRepository.create(
      EmployeeFactory.create({
        email: registredEmail,
      })
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return true if email was registred by Barbershop", async () => {
    await fakeRepositoryFactory.barbershopRepository.create(
      BarbershopFactory.create({})
    );

    await expect(
      emailValidatorService.isUsed(registredEmail)
    ).resolves.toBeTruthy();
  });

  it("should return registred email", async () => {
    const createdBarbershop =
      await fakeRepositoryFactory.barbershopRepository.create(
        BarbershopFactory.create({})
      );

    const result = await emailValidatorService.findByAuthenticatedEmail(
      createdBarbershop.email.value
    );

    expect(result).toBeInstanceOf(Barbershop);
  });
});
