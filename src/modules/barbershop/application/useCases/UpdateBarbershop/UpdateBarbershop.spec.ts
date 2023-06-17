import { describe, beforeEach, it, expect } from "vitest";

import { FakeRepositoryFactory } from "@infra/database/factories/fakes/FakeRepositoryFactory";

import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

import { UpdateBarbershop } from "./UpdateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = BarbershopFactory.create({});

let updateBarbershop: UpdateBarbershop;

describe("UpdateBarbershop.ts", () => {
  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    updateBarbershop = new UpdateBarbershop({
      updateBarbershopRepository: fakeRepositoryFactory.barbershopRepository,
    });
  });

  it("should update all Barbershop fields", async () => {
    const dataToUpdate = {
      id: barbershop.id,
      email: barbershop.email.value,
      street: BaseFactory.makeAddressStreet(),
      neighborhood: BaseFactory.makeAddressNeighborhood(),
      number: BaseFactory.makeAddressNumber(),
      avatarUrl: BaseFactory.makeAvatar(),
      phone: BaseFactory.makePhone(),
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
    const street = BaseFactory.makeAddressStreet();

    const result = await updateBarbershop.execute({
      id: barbershop.id,
      email: barbershop.email.value,
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
      email: barbershop.email.value,
      street: BaseFactory.makeAddressStreet(),
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
