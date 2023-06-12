import { expect, describe, it, beforeEach } from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { Client } from "@modules/client/domain/client/Client";

import { ClientNotFoundError } from "./errors/ClientNotFoundError";

import { ShowAuthenticatedClient } from "./ShowAuthenticatedClient";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let showAuthenticatedClient: ShowAuthenticatedClient;

describe("ShowAuthenticatedClient.ts", () => {
  beforeEach(async () => {
    showAuthenticatedClient = new ShowAuthenticatedClient({
      findByIdClientRepository: fakeRepositoryFactory.clientRepository,
    });
  });

  it("should show the authenticated client", async () => {
    const authenticatedClient = ClientFactory.createAndAuthenticate({});

    await fakeRepositoryFactory.clientRepository.create(
      authenticatedClient.client
    );

    const result = await showAuthenticatedClient.execute({
      clientId: authenticatedClient.jwt.authenticatedId,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeInstanceOf(Client);
    expect(result.value.id).toBe(authenticatedClient.client.id);
  });

  it("should not show the authenticated client if client does not exist", async () => {
    const result = await showAuthenticatedClient.execute({
      clientId: "invalid-id",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new ClientNotFoundError());
  });
});
