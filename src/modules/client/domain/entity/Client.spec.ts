import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Client } from "./Client";

describe("Client.ts", () => {
  it("should create Client instance", () => {
    const client = Client.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(client).toBeInstanceOf(Client);
  });
});
