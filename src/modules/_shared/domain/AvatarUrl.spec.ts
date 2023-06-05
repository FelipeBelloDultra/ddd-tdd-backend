import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { AvatarUrl } from "./AvatarUrl";

describe("AvatarUrl.ts", () => {
  it("should create an avatar url", () => {
    const url = BaseFactory.makeAvatar();
    const avatarUrl = AvatarUrl.create(url);

    expect(avatarUrl.isRight()).toBeTruthy();
    expect((avatarUrl.value as AvatarUrl).value).toBe(url);
  });
});
