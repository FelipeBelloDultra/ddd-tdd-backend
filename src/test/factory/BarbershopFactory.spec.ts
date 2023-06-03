import { describe, it, expect } from "vitest";
import { BarbershopFactory } from "./BarbershopFactory";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

describe("BarbershopFactory.ts", () => {
  it("should create an instance of Barbershop", () => {
    const result = BarbershopFactory.create();

    expect(result).toBeInstanceOf(Barbershop);
  });
});
