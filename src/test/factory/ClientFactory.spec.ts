import { describe, it, expect } from "vitest";

import { ClientFactory } from "./ClientFactory";

import { Client } from "@modules/client/domain/client/Client";

describe("ClientFactory.ts", () => {
  it("should create an instance of Client", () => {
    const result = ClientFactory.create();

    expect(result).toBeInstanceOf(Client);
  });
});
