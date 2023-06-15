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
    const result = await BaseRequest.post("clients/session/me").send({
      clientId: AUTHENTICATED_CLIENT.jwt.authenticatedId,
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("id", AUTHENTICATED_CLIENT.client.id);
    expect(result.body).toHaveProperty(
      "email",
      AUTHENTICATED_CLIENT.client.email.value
    );
    expect(result.body).not.toHaveProperty("password");
  });

  it("should not show an authenticated client if id is invalid", async () => {
    const result = await BaseRequest.post("clients/session/me").send({
      clientId: "invalid-id",
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error", "Client does not exist");
  });
});
