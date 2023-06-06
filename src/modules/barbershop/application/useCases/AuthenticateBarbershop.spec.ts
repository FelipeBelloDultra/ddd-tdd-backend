import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

import { Jwt } from "@core/domain/Jwt";

import { InvalidEmailOrPasswordError } from "./errors/InvalidEmailOrPasswordError";

import { AuthenticateBarbershop } from "./AuthenticateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let authenticateBarbershop: AuthenticateBarbershop;

describe.concurrent("AuthenticateBarbershop.ts", () => {
  beforeEach(async () => {
    authenticateBarbershop = new AuthenticateBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should authenticate an barbershop", async () => {
    const createdBarbershop = BarbershopFactory.create({
      password: "password",
    });

    await fakeRepositoryFactory.barbershopRepository.create(createdBarbershop);

    const result = await authenticateBarbershop.execute({
      email: createdBarbershop.email.value,
      password: "password",
    });

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
    expect(decoded.value.roles).toEqual(["barbershop"]);
  });

  it("should not authenticate barbershop if email does not exist or password is incorrect", async () => {
    const result = await authenticateBarbershop.execute({
      email: "email@example.com",
      password: "password",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new InvalidEmailOrPasswordError());
  });
});
