import { describe, it, expect, beforeAll } from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { BaseRequest } from "@test/factory/BaseRequest";
import { BaseFactory } from "@test/factory/BaseFactory";

import { queries } from "@infra/database/queries";

const CREATED_BARBERSHOP = BarbershopFactory.create({});

describe("E2E - /barbershops - [POST]", () => {
  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(CREATED_BARBERSHOP),
    });
  });

  it("should create an barbershop", async () => {
    const result = await BaseRequest.post("barbershops").send({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(201);
  });

  it("should not create a new barbershop if email already exists", async () => {
    const result = await BaseRequest.post("barbershops").send({
      name: BaseFactory.makeFullName(),
      email: CREATED_BARBERSHOP.email.value,
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error", "Email already registered");
  });
});
