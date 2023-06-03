import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { BarbershopFactory } from "@test/factory/BarbershopFactory";

import { UpdateBarbershop } from "./UpdateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = BarbershopFactory.create();

let updateBarbershop: UpdateBarbershop;

describe("UpdateBarbershop.ts", () => {
  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    updateBarbershop = new UpdateBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should update all Barbershop fields", async () => {
    const dataToUpdate = {
      id: barbershop.id,
      street: faker.location.street(),
      neighborhood: faker.location.secondaryAddress(),
      number: faker.location.buildingNumber(),
      avatarUrl: faker.internet.avatar(),
      phone: faker.phone.number("+55 99 99999-9999"),
    };

    const result = await updateBarbershop.execute(dataToUpdate);

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.isRight).toBeTruthy();
    expect(result.value.id).toBe(dataToUpdate.id);
    expect(result.value.phone?.value).toBe(dataToUpdate.phone);
  });

  it("should update one Barbershop field", async () => {
    const street = faker.location.street();

    const result = await updateBarbershop.execute({
      id: barbershop.id,
      street,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.isRight()).toBeTruthy();
    expect(result.value.street?.value).toBe(street);
  });

  it("should not update Barbershop by id if user does not exists", async () => {
    const result = await updateBarbershop.execute({
      id: "no-exist",
      street: faker.location.street(),
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
