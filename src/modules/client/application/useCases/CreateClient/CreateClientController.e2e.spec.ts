import { describe, it, expect, beforeAll } from "vitest";

import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BaseRequest } from "@test/factory/BaseRequest";
import { BaseFactory } from "@test/factory/BaseFactory";

import { queries } from "@infra/database/queries";

const CREATED_CLIENT = ClientFactory.create({});

describe("E2E - /clients - [POST]", () => {
  beforeAll(async () => {
    await queries.client.create({
      data: await ClientMapper.toPersistence(CREATED_CLIENT),
    });
  });

  it("should create an client", async () => {
    const result = await BaseRequest.post("clients").send({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(201);
  });

  it("should not create a new client if email already exists", async () => {
    const result = await BaseRequest.post("clients").send({
      name: BaseFactory.makeFullName(),
      email: CREATED_CLIENT.email.value,
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toHaveProperty(
      "message",
      "Email already registered"
    );
  });
});
