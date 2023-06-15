import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/database/factories/fakes/FakeRepositoryFactory";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { BaseFactory } from "@test/factory/BaseFactory";

import { Jwt } from "@core/domain/Jwt";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

import { AuthenticateService } from "./AuthenticateService";
import { EmailValidatorService } from "./EmailValidatorService";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let authenticateService: AuthenticateService;
let emailValidatorService: EmailValidatorService;

describe("AuthenticateService.ts", () => {
  beforeEach(async () => {
    emailValidatorService = new EmailValidatorService({
      barbershopRepository: fakeRepositoryFactory.barbershopRepository,
      clientRepository: fakeRepositoryFactory.clientRepository,
      employeeRepository: fakeRepositoryFactory.employeeRepository,
    });

    authenticateService = new AuthenticateService({
      emailValidatorService,
    });
  });

  it("should authenticate an client", async () => {
    const createdClient = ClientFactory.create({ password: "password" });

    await fakeRepositoryFactory.clientRepository.create(createdClient);

    const result = await authenticateService.authenticate(
      {
        email: createdClient.email.value,
        password: "password",
      },
      "client"
    );

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.value.authenticatedId).toBe(createdClient.id);

    const decoded = Jwt.decodeToken(result.value.token);

    if (decoded.isLeft()) {
      throw new Error();
    }

    expect(decoded.value.id).toBe(createdClient.id);
    expect(decoded.value.email).toBe(createdClient.email.value);
    expect(decoded.value.name).toBe(createdClient.name.value);
  });

  it("should authenticate an barbershop", async () => {
    const createdBarbershop = BarbershopFactory.create({
      password: "password",
    });

    await fakeRepositoryFactory.barbershopRepository.create(createdBarbershop);

    const result = await authenticateService.authenticate(
      {
        email: createdBarbershop.email.value,
        password: "password",
      },
      "admin"
    );

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.value.authenticatedId).toBe(createdBarbershop.id);

    const decoded = Jwt.decodeToken(result.value.token);

    if (decoded.isLeft()) {
      throw new Error();
    }

    expect(decoded.value.id).toBe(createdBarbershop.id);
    expect(decoded.value.email).toBe(createdBarbershop.email.value);
    expect(decoded.value.name).toBe(createdBarbershop.name.value);
  });

  it("should not be able to authenticate if email does not match or entity does not exists", async () => {
    const result = await authenticateService.authenticate(
      {
        email: BaseFactory.makeEmail(),
        password: BaseFactory.makePassword(),
      },
      "client"
    );

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new InvalidEmailOrPasswordError());
  });

  it("should not be able to authenticate if password does not match with entity finded by email", async () => {
    const createdBarbershop =
      await fakeRepositoryFactory.barbershopRepository.create(
        BarbershopFactory.create({})
      );

    const result = await authenticateService.authenticate(
      {
        email: createdBarbershop.email.value,
        password: "123456abcdef",
      },
      "admin"
    );

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new InvalidEmailOrPasswordError());
  });
});
