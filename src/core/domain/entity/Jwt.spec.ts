import { faker } from "@faker-js/faker";
import { expect, it, describe } from "vitest";
import { Jwt } from "./Jwt";

const user = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  roles: ["admin"],
};

describe("TokenGenerator.ts", () => {
  it("should generate token", () => {
    const tokenGenerator = Jwt.sign({
      id: user.id,
      roles: user.roles,
    });

    expect(tokenGenerator.token).toBeTypeOf("string");
  });

  it("should decode generated token", () => {
    const { token } = Jwt.sign({
      id: user.id,
      roles: user.roles,
    });

    const result = Jwt.decodeToken(token);

    expect(result).toHaveProperty("id", user.id);
  });

  it("should not be able decode invalid token", () => {
    expect(() => Jwt.decodeToken("invalid-token")).toThrowError(
      "Invalid token"
    );
  });
});
