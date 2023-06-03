import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Street } from "./Street";

describe("Street.ts", () => {
  it("should create an street location", () => {
    const streetValue = BaseFactory.makeAddressStreet();
    const street = Street.create(streetValue);

    expect(street.isRight()).toBeTruthy();
    expect((street.value as Street).value).toBe(streetValue);
  });
});
