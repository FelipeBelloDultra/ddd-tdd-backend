import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";

import { Barbershop } from "./Barbershop";
import { Street } from "./Street";

describe("Barbershop.ts", () => {
  it("should create Barbershop instance", () => {
    const barbershop = Barbershop.create(BarbershopFactory.create({}));

    expect(barbershop.isRight()).toBeTruthy();
  });

  it("should update Barbershop instance", () => {
    const createdBarbershop = BarbershopFactory.create({});
    const street = Street.create(BaseFactory.makeAddressStreet())
      .value as Street;

    const barbershop = Barbershop.create(createdBarbershop);

    if (barbershop.isLeft()) {
      throw new Error();
    }

    expect(barbershop.isRight()).toBeTruthy();
    expect(barbershop.value.neighborhood?.value).toBe(
      createdBarbershop.neighborhood?.value
    );
    const updatedBarbershop = barbershop.value.update({ street })
      .value as Barbershop;

    expect(updatedBarbershop.street?.value).toBe(street.value);
    expect(updatedBarbershop.id).toBe(barbershop.value.id);
  });
});
