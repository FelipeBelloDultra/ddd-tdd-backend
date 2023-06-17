import { describe, it, expect, beforeAll } from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BaseRequest } from "@test/factory/BaseRequest";

import { queries } from "@infra/database/queries";

const AUTHENTICATED_BARBERSHOP = BarbershopFactory.createAndAuthenticate({});
const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({});

describe("E2E - /barbershops/session/me - [POST]", () => {
  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(
        AUTHENTICATED_BARBERSHOP.barbershop
      ),
    });
  });

  it("should show an authenticated barbershop", async () => {
    const result = await BaseRequest.post("barbershops/session/me").set(
      "x-access-token",
      AUTHENTICATED_BARBERSHOP.jwt.token
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty(
      "id",
      AUTHENTICATED_BARBERSHOP.barbershop.id
    );
    expect(result.body.data).toHaveProperty(
      "email",
      AUTHENTICATED_BARBERSHOP.barbershop.email.value
    );
    expect(result.body.data).toHaveProperty("phone", null);
    expect(result.body.data).not.toHaveProperty("password");
  });

  it("should not show an authenticated barbershop if token is invalid", async () => {
    const result = await BaseRequest.post("barbershops/session/me").set(
      "x-access-token",
      "invalid-id"
    );

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("error", "Access denied");
  });

  it("should not show an authenticated barbershop if token is from client", async () => {
    const result = await BaseRequest.post("barbershops/session/me").set(
      "x-access-token",
      AUTHENTICATED_CLIENT.jwt.token
    );

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("error", "Access denied");
  });
});
