import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { StreetNumber } from "./StreetNumber";

describe("StreetNumber.ts", () => {
  it("should create an street number location", () => {
    const streetNumberValue = faker.location.buildingNumber();
    const streetNumber = StreetNumber.create(streetNumberValue);

    expect(streetNumber.isRight()).toBeTruthy();
    expect((streetNumber.value as StreetNumber).value).toBe(streetNumberValue);
  });
});
