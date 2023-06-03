import { describe, it, expect } from "vitest";
import { BarbershopFactory } from "@test/factory/BarbershopFactory";
import { Barbershop } from "./Barbershop";

describe("Barbershop.ts", () => {
  it("should create Barbershop instance", () => {
    const barbershop = Barbershop.create(BarbershopFactory.create());

    expect(barbershop.isRight()).toBeTruthy();
  });
});
