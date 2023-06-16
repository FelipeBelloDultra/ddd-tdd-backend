import { expect, it, describe } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { Jwt } from "./Jwt";

import { InvalidJwtTokenError } from "./errors/InvalidJwtTokenError";

const user = {
  id: BaseFactory.makeUuid(),
  email: BaseFactory.makeEmail(),
  name: BaseFactory.makeFullName(),
  permissions: ["admin"],
};

describe("TokenGenerator.ts", () => {
  it("should generate token", () => {
    const tokenGenerator = Jwt.sign({
      id: user.id,
      permissions: user.permissions,
    });

    expect(tokenGenerator.token).toBeTypeOf("string");
  });

  it("should decode generated token", () => {
    const { token } = Jwt.sign({
      id: user.id,
      permissions: user.permissions,
    });

    const result = Jwt.decodeToken(token);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty("id", user.id);
  });

  it("should not be able decode invalid token", () => {
    const error = Jwt.decodeToken("invalid-token");

    expect(error.isLeft()).toBeTruthy();
    expect(error.value).toEqual(new InvalidJwtTokenError());
  });
});
