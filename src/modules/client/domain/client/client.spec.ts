import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Client } from "./client";
import { Name } from "@_shared/domain/name";
import { Email } from "@_shared/domain/email";
import { Password } from "@_shared/domain/password";

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
