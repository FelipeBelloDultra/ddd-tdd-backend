import { describe, it, expect } from "vitest";
import { ClientFactory } from "@test/factory/ClientFactory";

import { Client } from "./Client";

describe("Client.ts", () => {
  it("should create Client instance", () => {
    const client = Client.create(ClientFactory.create());

    expect(client.isRight).toBeTruthy();
  });
});
