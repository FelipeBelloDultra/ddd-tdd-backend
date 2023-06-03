import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { StreetNumber } from "./StreetNumber";

describe("StreetNumber.ts", () => {
  it("should create an street number location", () => {
    const streetNumberValue = BaseFactory.makeAddressNumber();
    const streetNumber = StreetNumber.create(streetNumberValue);

    expect(streetNumber.isRight()).toBeTruthy();
    expect((streetNumber.value as StreetNumber).value).toBe(streetNumberValue);
  });
});
