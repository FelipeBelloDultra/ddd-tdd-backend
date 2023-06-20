import { describe, it, expect, beforeAll } from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { BaseRequest } from "@test/factory/BaseRequest";
import { BaseFactory } from "@test/factory/BaseFactory";

import { queries } from "@infra/database/queries";

const EMAIL = BaseFactory.makeEmail();
const PASSWORD = BaseFactory.makePassword();
const AUTHENTICATED_BARBERSHOP = BarbershopFactory.createAndAuthenticate({
  email: EMAIL,
  password: PASSWORD,
});

describe("E2E - /barbershops/session - [POST]", () => {
  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(
        AUTHENTICATED_BARBERSHOP.barbershop
      ),
    });
  });

  it("should authenticate an barbershop", async () => {
    const result = await BaseRequest.post("barbershops/session").send({
      email: EMAIL,
      password: PASSWORD,
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty(
      "token",
      AUTHENTICATED_BARBERSHOP.jwt.token
    );
    expect(result.body.error).toBeUndefined();
  });

  it("should not authenticate an barbershop with wrong credentials", async () => {
    const result = await BaseRequest.post("barbershops/session").send({
      email: BaseFactory.makeEmail(),
      password: BaseFactory.makePassword(),
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toHaveProperty(
      "message",
      "Invalid e-mail/password combination"
    );
  });
});
