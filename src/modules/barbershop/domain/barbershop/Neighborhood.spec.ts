import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Neighborhood } from "./Neighborhood";

describe("Neighborhood.ts", () => {
  it("should create an neighborhood location", () => {
    const neighborhoodValue = BaseFactory.makeAddressNeighborhood();
    const neighborhood = Neighborhood.create(neighborhoodValue);

    expect(neighborhood.isRight()).toBeTruthy();
    expect((neighborhood.value as Neighborhood).value).toBe(neighborhoodValue);
  });
});
