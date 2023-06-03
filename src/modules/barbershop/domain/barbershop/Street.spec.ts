import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { Street } from "./Street";

describe("Street.ts", () => {
  it("should create an street location", () => {
    const streetValue = faker.location.street();
    const street = Street.create(streetValue);

    expect(street.isRight()).toBeTruthy();
    expect((street.value as Street).value).toBe(streetValue);
  });
});
