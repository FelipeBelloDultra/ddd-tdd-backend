import { describe, it, expect } from "vitest";

import { Client } from "@modules/client/domain/client/Client";

import { ClientFactory } from "./ClientFactory";
import { BaseFactory } from "../BaseFactory";

describe("ClientFactory.ts", () => {
  it("should create an instance of Client", () => {
    const result = ClientFactory.create({});

    expect(result).toBeInstanceOf(Client);
  });

  it("should create an instance of Client with custom fields", () => {
    const email = BaseFactory.makeEmail();

    const result = ClientFactory.create({
      email,
    });

    expect(result.email.value).toBe(email);
  });
});
