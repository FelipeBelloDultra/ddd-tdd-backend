import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Email } from "./Email";

describe("Email.ts", () => {
  it("should accept valid email address", () => {
    const email = Email.create(faker.internet.email());

    expect(email.isRight()).toBeTruthy();
  });

  it("should reject invalid email address", () => {
    const email1 = Email.create("johndoe");
    const email2 = Email.create("johndoe@example");
    const email3 = Email.create("@example.com");
    const email4 = Email.create("johndoe@example.");

    expect(email1.isLeft()).toBeTruthy();
    expect(email2.isLeft()).toBeTruthy();
    expect(email3.isLeft()).toBeTruthy();
    expect(email4.isLeft()).toBeTruthy();
  });

  it("should reject emails with more than 255 characters", () => {
    const domain = "c".repeat(260);
    const email = Email.create(`johndoe@${domain}.com`);

    expect(email.isLeft()).toBeTruthy();
  });
});
