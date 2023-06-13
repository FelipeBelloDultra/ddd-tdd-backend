import { describe, it, expect } from "vitest";
import { BaseFactory } from "@test/factory/BaseFactory";
import { BaseRequest } from "@test/factory/BaseRequest";

const toCreateClient = {
  name: BaseFactory.makeFullName(),
  email: BaseFactory.makeEmail(),
  password: BaseFactory.makePassword(),
};

describe("E2E - /clients - [POST]", () => {
  it("should create an client", async () => {
    const result = await BaseRequest.post("clients").send({
      name: BaseFactory.makeFullName(),
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(201);
  });

  it("should not create a new client if email already exists", async () => {
    await BaseRequest.post("clients").send(toCreateClient);

    const result = await BaseRequest.post("clients").send({
      name: BaseFactory.makeFullName(),
      email: toCreateClient.email,
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("error", "Email already registered");
  });
});
