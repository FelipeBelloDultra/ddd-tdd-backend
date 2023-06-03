import { describe, it, expect } from "vitest";
import { BarbershopFactory } from "./BarbershopFactory";
import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

describe("BarbershopFactory.ts", () => {
  it("should create an instance of Barbershop", () => {
    const result = BarbershopFactory.create();

    expect(result).toBeInstanceOf(Barbershop);
  });

  it("should create 3 instances of Barbershop", () => {
    const barbershops = BarbershopFactory.createSome(3);

    expect(barbershops.length).toBe(3);
    expect(
      barbershops.every((client) => client instanceof Barbershop)
    ).toBeTruthy();
  });
});
