import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

import { ShowAuthenticatedBarbershop } from "./ShowAuthenticatedBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let showAuthenticatedBarbershop: ShowAuthenticatedBarbershop;

describe("ShowAuthenticatedBarbershop.ts", () => {
  beforeEach(async () => {
    showAuthenticatedBarbershop = new ShowAuthenticatedBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should show the authenticated barbershop", async () => {
    const authenticatedBarbershop = BarbershopFactory.createAndAuthenticate({});

    await fakeRepositoryFactory.barbershopRepository.create(
      authenticatedBarbershop.barbershop
    );

    const result = await showAuthenticatedBarbershop.execute({
      barbershopId: authenticatedBarbershop.jwt.authenticatedId,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Barbershop);
    expect(result.value.id).toBe(authenticatedBarbershop.barbershop.id);
  });

  it("should not show the authenticated barbershop if barbershop does not exist", async () => {
    const result = await showAuthenticatedBarbershop.execute({
      barbershopId: "invalid-id",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new BarbershopNotFoundError());
  });
});
