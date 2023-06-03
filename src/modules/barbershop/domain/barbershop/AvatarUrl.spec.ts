import { faker } from "@faker-js/faker";
import { describe, it, expect } from "vitest";
import { AvatarUrl } from "./AvatarUrl";

describe("AvatarUrl.ts", () => {
  it("should create an avatar url", () => {
    const url = faker.internet.avatar();
    const avatarUrl = AvatarUrl.create(url);

    expect(avatarUrl.isRight()).toBeTruthy();
    expect((avatarUrl.value as AvatarUrl).value).toBe(url);
  });
});
