import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { Jwt } from "@core/domain/Jwt";

import { AuthenticateService } from "@_shared/application/services/AuthenticateService";

import { AuthenticateClient } from "./AuthenticateClient";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let authenticateClient: AuthenticateClient;
let authenticateService: AuthenticateService;

describe.concurrent("AuthenticateClient.ts", () => {
  beforeEach(async () => {
    authenticateService = new AuthenticateService({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
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
    expect(decoded.value.roles).toEqual(["client"]);
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
