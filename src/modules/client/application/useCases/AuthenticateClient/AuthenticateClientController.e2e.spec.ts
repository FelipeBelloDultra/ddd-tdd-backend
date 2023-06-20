import { describe, it, expect, beforeAll } from "vitest";

import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BaseRequest } from "@test/factory/BaseRequest";
import { BaseFactory } from "@test/factory/BaseFactory";

import { queries } from "@infra/database/queries";

const EMAIL = BaseFactory.makeEmail();
const PASSWORD = BaseFactory.makePassword();
const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({
  email: EMAIL,
  password: PASSWORD,
});

describe("E2E - /clients/session - [POST]", () => {
  beforeAll(async () => {
    await queries.client.create({
      data: await ClientMapper.toPersistence(AUTHENTICATED_CLIENT.client),
    });
  });

  it("should authenticate an client", async () => {
    const result = await BaseRequest.post("clients/session").send({
      email: EMAIL,
      password: PASSWORD,
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty(
      "token",
      AUTHENTICATED_CLIENT.jwt.token
    );
    expect(result.body.error).toBeUndefined();
  });

  it("should not authenticate an client with wrong credentials", async () => {
    const result = await BaseRequest.post("clients/session").send({
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toHaveProperty(
      "message",
      "Invalid e-mail/password combination"
    );
  });
});
