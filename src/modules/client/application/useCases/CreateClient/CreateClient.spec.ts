import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/database/factories/fakes/FakeRepositoryFactory";

import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { BaseFactory } from "@test/factory/BaseFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { ClientEmailAlreadyUsedError } from "./errors/ClientEmailAlreadyUsedError";

import { CreateClient } from "./CreateClient";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createClient: CreateClient;
let emailValidatorService: EmailValidatorService;

describe("CreateClient.ts", () => {
  beforeEach(() => {
    emailValidatorService = new EmailValidatorService({
      barbershopRepository: fakeRepositoryFactory.barbershopRepository,
      clientRepository: fakeRepositoryFactory.clientRepository,
      employeeRepository: fakeRepositoryFactory.employeeRepository,
    });

    createClient = new CreateClient({
      createClientRepository: fakeRepositoryFactory.clientRepository,
      emailValidatorService,
    });
  });

  it("should create Client", async () => {
    const result = await createClient.execute({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not create Client with invalid data", async () => {
    const result = await createClient.execute({
      name: "",
      email: "",
      password: "",
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be able create Client if email already exists", async () => {
    const client = ClientFactory.create({});

    await fakeRepositoryFactory.clientRepository.create(client);

    const result = await createClient.execute({
      name: BaseFactory.makeFullName(),
      email: client.email.value,
      password: BaseFactory.makePassword(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new ClientEmailAlreadyUsedError());
  });
});
