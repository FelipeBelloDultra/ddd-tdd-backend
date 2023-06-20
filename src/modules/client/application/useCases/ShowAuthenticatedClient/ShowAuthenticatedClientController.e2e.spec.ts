import { describe, it, expect, beforeAll } from "vitest";

import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BaseRequest } from "@test/factory/BaseRequest";

import { queries } from "@infra/database/queries";

const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({});

describe("E2E - /clients/session/me - [POST]", () => {
  beforeAll(async () => {
    await queries.client.create({
      data: await ClientMapper.toPersistence(AUTHENTICATED_CLIENT.client),
    });
  });

  it("should show an authenticated client", async () => {
    const result = await BaseRequest.post("clients/session/me").set(
      "x-access-token",
      AUTHENTICATED_CLIENT.jwt.token
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty(
      "id",
      AUTHENTICATED_CLIENT.client.id
    );
    expect(result.body.data).toHaveProperty(
      "email",
      AUTHENTICATED_CLIENT.client.email.value
    );
    expect(result.body.data).not.toHaveProperty("password");
  });

  it("should not show an authenticated client if token is invalid", async () => {
    const result = await BaseRequest.post("clients/session/me").set(
      "x-access-token",
      "invalid-id"
    );

    expect(result.status).toBe(403);
    expect(result.body.error).toHaveProperty("message", "Access denied");
  });
});
