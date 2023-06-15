import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

import { BarbershopEmailAlreadyUsedError } from "./errors/BarbershopEmailAlreadyUsedError";

import { CreateBarbershop } from "./CreateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createBarbershop: CreateBarbershop;
let emailValidatorService: EmailValidatorService;

describe("CreateBarbershop.ts", () => {
  beforeEach(() => {
    emailValidatorService = new EmailValidatorService({
      barbershopRepository: fakeRepositoryFactory.barbershopRepository,
      clientRepository: fakeRepositoryFactory.clientRepository,
      employeeRepository: fakeRepositoryFactory.employeeRepository,
    });

    createBarbershop = new CreateBarbershop({
      createBarbershopRepository: fakeRepositoryFactory.barbershopRepository,
      emailValidatorService,
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
