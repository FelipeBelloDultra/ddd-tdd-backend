import { describe, it, expect } from "vitest";

import { Jwt } from "@core/domain/Jwt";

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

  it("should create and authenticate an barbershop", () => {
    const createdAndAuthenticatedBarbershop =
      BarbershopFactory.createAndAuthenticate({});

    const decodedJwt = Jwt.decodeToken(
      createdAndAuthenticatedBarbershop.jwt.token
    );

    if (decodedJwt.isLeft()) {
      throw new Error();
    }

    expect(decodedJwt.value.id).toBe(
      createdAndAuthenticatedBarbershop.barbershop.id
    );
    expect(decodedJwt.value.name).toBe(
      createdAndAuthenticatedBarbershop.barbershop.name.value
    );
    expect(decodedJwt.value.email).toBe(
      createdAndAuthenticatedBarbershop.barbershop.email.value
    );
  });
});
