import { describe, it, expect } from "vitest";

import { Jwt } from "@core/domain/Jwt";

import { Client } from "@modules/client/domain/client/Client";

import { ClientFactory } from "./ClientFactory";
import { BaseFactory } from "../BaseFactory";

describe("ClientFactory.ts", () => {
  it("should create an instance of Client", () => {
    const result = ClientFactory.create({});

    expect(result).toBeInstanceOf(Client);
  });

  it("should create an instance of Client with custom fields", () => {
    const email = BaseFactory.makeEmail();

    const result = ClientFactory.create({
      email,
    });

    expect(result.email.value).toBe(email);
  });

  it("should create and authenticate an client", () => {
    const createdAndAuthenticatedClient = ClientFactory.createAndAuthenticate(
      {}
    );

    const decodedJwt = Jwt.decodeToken(createdAndAuthenticatedClient.jwt.token);

    if (decodedJwt.isLeft()) {
      throw new Error();
    }

    expect(decodedJwt.value.id).toBe(createdAndAuthenticatedClient.client.id);
    expect(decodedJwt.value.name).toBe(
      createdAndAuthenticatedClient.client.name.value
    );
    expect(decodedJwt.value.email).toBe(
      createdAndAuthenticatedClient.client.email.value
    );
  });
});
