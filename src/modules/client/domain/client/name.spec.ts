import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Name } from "./name";

describe("Name.ts", () => {
  it("should accept valid name", () => {
    const name = Name.create(faker.person.fullName());

    expect(name.isRight()).toBeTruthy();
  });

  it("should reject name with is empty", () => {
    const name = Name.create("");

    expect(name.isLeft()).toBeTruthy();
  });

  it("should reject name with more than 255 characters", () => {
    const name = Name.create("X".repeat(256));

    expect(name.isLeft()).toBeTruthy();
  });
});
