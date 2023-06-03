import { describe, it, expect } from "vitest";

import { ClientFactory } from "./ClientFactory";

import { Client } from "@modules/client/domain/client/Client";

describe("ClientFactory.ts", () => {
  it("should create an instance of Client", () => {
    const result = ClientFactory.create();

    expect(result).toBeInstanceOf(Client);
  });

  it("should create 3 instances of Client", () => {
    const clients = ClientFactory.createSome(3);

    expect(clients.length).toBe(3);
    expect(clients.every((client) => client instanceof Client)).toBeTruthy();
  });
});
