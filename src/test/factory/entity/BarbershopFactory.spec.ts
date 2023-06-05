import { describe, it, expect } from "vitest";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

import { BarbershopFactory } from "./BarbershopFactory";
import { BaseFactory } from "../BaseFactory";

describe("BarbershopFactory.ts", () => {
  it("should create an instance of Barbershop", () => {
    const result = BarbershopFactory.create({});

    expect(result).toBeInstanceOf(Barbershop);
  });

  it("should create an instance of Barbershop with custom fields", () => {
    const email = BaseFactory.makeEmail();

    const result = BarbershopFactory.create({
      email,
    });

    expect(result.email.value).toBe(email);
  });
});
