import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "@infra/http/app";
import { BaseFactory } from "@test/factory/BaseFactory";

const url = "/api/v1";

describe("E2E - /clients - [POST]", () => {
  it("should create an client", async () => {
    const result = await request(app).post(`${url}/clients`).send({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(201);
  });
});
