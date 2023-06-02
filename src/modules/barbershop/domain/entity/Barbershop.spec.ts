import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Barbershop } from "./Barbershop";

describe("Barbershop.ts", () => {
  it("should create Barbershop instance", () => {
    const barbershop = Barbershop.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(barbershop).toBeInstanceOf(Barbershop);
  });
});
