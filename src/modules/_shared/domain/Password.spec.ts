import bcrypt from "bcryptjs";
import { describe, it, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Password } from "./Password";

describe("Password.ts", () => {
  it("should accept valid password", () => {
    const validPassword = BaseFactory.makePassword();
    const password = Password.create(validPassword);

    expect(password.isRight()).toBeTruthy();
  });

  it("should reject password with less than 6 characters", () => {
    const shortPassword = BaseFactory.makePassword({ length: 3 });
    const password = Password.create(shortPassword);

    expect(password.isLeft()).toBeTruthy();
  });

  it("should reject password with more than 255 characters", () => {
    const password = Password.create("1".repeat(260));

    expect(password.isLeft()).toBeTruthy();
  });

  it("should be able to hash the password", async () => {
    const validPassword = BaseFactory.makePassword();
    const password = Password.create(validPassword);

    if (password.isLeft()) {
      throw new Error();
    }

    const hashedPassword = await password.value.getHashedValue();

    await expect(
      bcrypt.compare(validPassword, hashedPassword)
    ).resolves.toBeTruthy();
  });

  it("should not hash the password when already hashed", async () => {
    const validPassword = BaseFactory.makePassword();

    const hashedPassword = await bcrypt.hash(validPassword, 8);
    const password = Password.create(hashedPassword, true);

    if (password.isLeft()) {
      throw new Error();
    }

    await expect(password.value.getHashedValue()).resolves.toEqual(
      hashedPassword
    );
  });

  it("should be able to compare the password when not hashed", async () => {
    const validPassword = BaseFactory.makePassword();
    const password = Password.create(validPassword);

    if (password.isLeft()) {
      throw new Error();
    }

    expect(password.value.comparePassword(validPassword)).toBeTruthy();
  });

  it("should be able to compare the password when hashed", async () => {
    const validPassword = BaseFactory.makePassword();

    const hashedPassword = await bcrypt.hash(validPassword, 8);
    const password = Password.create(hashedPassword, true);

    if (password.isLeft()) {
      throw new Error();
    }

    expect(password.value.comparePassword(validPassword)).toBeTruthy();
  });
});
