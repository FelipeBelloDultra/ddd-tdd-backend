import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/database/factories/fakes/FakeRepositoryFactory";

import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { Jwt } from "@core/domain/Jwt";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";
import { EmailValidatorService } from "@_shared/application/services/EmailValidatorService";

import { AuthenticateClient } from "./AuthenticateClient";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let authenticateClient: AuthenticateClient;
let authenticateService: AuthenticateService;
let emailValidatorService: EmailValidatorService;

describe.concurrent("AuthenticateClient.ts", () => {
  beforeEach(async () => {
    emailValidatorService = new EmailValidatorService({
      barbershopRepository: fakeRepositoryFactory.barbershopRepository,
      clientRepository: fakeRepositoryFactory.clientRepository,
      employeeRepository: fakeRepositoryFactory.employeeRepository,
    });

    authenticateService = new AuthenticateService({
      emailValidatorService,
    });

    authenticateClient = new AuthenticateClient({ authenticateService });
  });

  it("should authenticate an client", async () => {
    const createdClient = ClientFactory.create({ password: "password" });

    await fakeRepositoryFactory.clientRepository.create(createdClient);

    const result = await authenticateClient.execute({
      email: createdClient.email.value,
      password: "password",
    });

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
    expect(decoded.value.permissions).toEqual([IPermissions.CLIENT]);
  });

  it("should not authenticate client if email does not exist or password is incorrect", async () => {
    const result = await authenticateClient.execute({
      email: "email@example.com",
      password: "password",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new InvalidEmailOrPasswordError());
  });
});
