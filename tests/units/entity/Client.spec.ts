import { faker } from "@faker-js/faker";
import { Client } from "~/domain/entity/Client";

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
