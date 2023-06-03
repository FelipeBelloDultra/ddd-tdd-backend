import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";

import { Neighborhood } from "./Neighborhood";

describe("Neighborhood.ts", () => {
  it("should create an neighborhood location", () => {
    const neighborhoodValue = faker.location.streetAddress();
    const neighborhood = Neighborhood.create(neighborhoodValue);

    expect(neighborhood.isRight()).toBeTruthy();
    expect((neighborhood.value as Neighborhood).value).toBe(neighborhoodValue);
  });
});
