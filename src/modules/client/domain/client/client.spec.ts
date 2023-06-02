import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Client } from "./client";
import { Name } from "./name";
import { Email } from "./email";
import { Password } from "./password";

const name = Name.create(faker.person.fullName()).value as Name;
const email = Email.create(faker.internet.email()).value as Email;
const password = Password.create(faker.internet.password({ length: 15 }))
  .value as Password;

describe("Client.ts", () => {
  it("should create Client instance", () => {
    const client = Client.create({
      name,
      email,
      password,
    });

    expect(client.isRight).toBeTruthy();
  });
});
