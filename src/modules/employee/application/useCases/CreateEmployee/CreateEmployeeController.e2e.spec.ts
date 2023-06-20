import { describe, it, expect, beforeAll } from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BaseRequest } from "@test/factory/BaseRequest";
import { BaseFactory } from "@test/factory/BaseFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { queries } from "@infra/database/queries";

const AUTHENTICATED_BARBERSHOP = BarbershopFactory.createAndAuthenticate({});

describe("E2E - /employees - [POST]", () => {
  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(
        AUTHENTICATED_BARBERSHOP.barbershop
      ),
    });
  });

  it("should create an employee", async () => {
    const result = await BaseRequest.post("employees")
      .send({
        name: BaseFactory.makeFullName(),
        email: BaseFactory.makeEmail(),
        phone: BaseFactory.makePhone(),
        avatarUrl: BaseFactory.makeAvatar(),
      })
      .set("x-access-token", AUTHENTICATED_BARBERSHOP.jwt.token);

    expect(result.status).toBe(201);
  });

  it("should not create an employee if access token is invalid/empty", async () => {
    const result = await BaseRequest.post("employees").send({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      phone: BaseFactory.makePhone(),
      avatarUrl: BaseFactory.makeAvatar(),
    });

    expect(result.status).toBe(403);
    expect(result.body.error).toHaveProperty("message", "Access denied");
  });

  it("should not create an employee if email already used", async () => {
    const result = await BaseRequest.post("employees")
      .send({
        name: BaseFactory.makeFullName(),
        email: AUTHENTICATED_BARBERSHOP.barbershop.email.value,
        phone: BaseFactory.makePhone(),
        avatarUrl: BaseFactory.makeAvatar(),
      })
      .set("x-access-token", AUTHENTICATED_BARBERSHOP.jwt.token);

    expect(result.status).toBe(400);
    expect(result.body.error).toHaveProperty(
      "message",
      "Email already registered"
    );
  });

  it("should not create an employee if access token is from client", async () => {
    const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({});

    const result = await BaseRequest.post("employees")
      .send({
        name: BaseFactory.makeFullName(),
        email: BaseFactory.makeEmail(),
        phone: BaseFactory.makePhone(),
        avatarUrl: BaseFactory.makeAvatar(),
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(403);
    expect(result.body.error).toHaveProperty("message", "Access denied");
  });
});
