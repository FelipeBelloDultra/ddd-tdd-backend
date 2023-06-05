import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Phone } from "./Phone";

describe("Phone.ts", () => {
  it("should create phone instance", () => {
    const phoneValue = BaseFactory.makePhone("+55 (99) 99999-9999");
    const phone = Phone.create(phoneValue);

    expect(phone.isRight()).toBeTruthy();
    expect((phone.value as Phone).value).toBe(phoneValue);
  });

  it("should not create phone instance with more than 255 characters", () => {
    const phoneValue = BaseFactory.makePhone("9".repeat(255));
    const phone = Phone.create(phoneValue);

    expect(phone.isLeft()).toBeTruthy();
  });

  it("should not create phone instance with invalid phone format", () => {
    const phoneValue = BaseFactory.makePhone("555-99-99999-9999");
    const phone = Phone.create(phoneValue);

    expect(phone.isLeft()).toBeTruthy();
  });
});
