import { expect, describe, it } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Entity } from "./Entity";

class CustomEntity extends Entity<{ name?: string }> {}

describe("Entity.ts", () => {
  it("should generate id if not provided", () => {
    const customEntity = new CustomEntity({});

    expect(customEntity.id).toBeTruthy();
  });

  it("should use the provided id if provided", () => {
    const id = BaseFactory.makeUuid();
    const customEntity = new CustomEntity({}, id);

    expect(customEntity.id).toEqual(id);
  });
});
