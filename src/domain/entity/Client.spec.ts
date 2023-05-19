import { faker } from "@faker-js/faker";
import { Client } from "./Client";

describe("Client.ts", () => {
  it("should create Client instance", () => {
    const client = new Client({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(client).toBeInstanceOf(Client);
  });
});
