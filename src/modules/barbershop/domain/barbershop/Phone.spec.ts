import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { Phone } from "./Phone";

describe("Phone.ts", () => {
  it("should create phone instance", () => {
    const phoneValue = faker.phone.number("+55 (99) 91234-5678");
    const phone = Phone.create(phoneValue);

    expect(phone.isRight()).toBeTruthy();
    expect((phone.value as Phone).value).toBe(phoneValue);
  });

  it("should not create phone instance with more than 255 characters", () => {
    const phoneValue = faker.phone.number("9".repeat(255));
    const phone = Phone.create(phoneValue);

    expect(phone.isLeft()).toBeTruthy();
  });

  it("should not create phone instance with invalid phone format", () => {
    const phoneValue = faker.phone.number("555-99-91234-5678");
    const phone = Phone.create(phoneValue);

    expect(phone.isLeft()).toBeTruthy();
  });
});
