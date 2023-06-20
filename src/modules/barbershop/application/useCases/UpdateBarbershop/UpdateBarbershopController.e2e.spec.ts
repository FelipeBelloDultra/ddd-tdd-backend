import { describe, it, expect, beforeEach, afterEach } from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BaseFactory } from "@test/factory/BaseFactory";
import { BaseRequest } from "@test/factory/BaseRequest";

import { queries } from "@infra/database/queries";

const PASSWORD = BaseFactory.makePassword();
const AUTHENTICATED_BARBERSHOP = BarbershopFactory.createAndAuthenticate({
  password: PASSWORD,
});

describe("E2E - /barbershops - [PUT]", () => {
  beforeEach(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(
        AUTHENTICATED_BARBERSHOP.barbershop
      ),
    });
  });

  it("should update an authenticated barbershop", async () => {
    const EXPECTED_FINAL_BARBERSHOP = {
      id: AUTHENTICATED_BARBERSHOP.barbershop.id,
      name: AUTHENTICATED_BARBERSHOP.barbershop.name.value,
      email: AUTHENTICATED_BARBERSHOP.barbershop.email.value,
      street: BaseFactory.makeAddressStreet(),
      neighborhood: BaseFactory.makeAddressNeighborhood(),
      number: BaseFactory.makeAddressNumber(),
      phone: BaseFactory.makePhone(),
      avatarUrl: BaseFactory.makeAvatar(),
    };

    const result = await BaseRequest.put("barbershops")
      .send({
        street: EXPECTED_FINAL_BARBERSHOP.street,
        neighborhood: EXPECTED_FINAL_BARBERSHOP.neighborhood,
        number: EXPECTED_FINAL_BARBERSHOP.number,
        phone: EXPECTED_FINAL_BARBERSHOP.phone,
        avatarUrl: EXPECTED_FINAL_BARBERSHOP.avatarUrl,
      })
      .set("x-access-token", AUTHENTICATED_BARBERSHOP.jwt.token);

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("data");
    expect(result.body.data).toMatchObject(EXPECTED_FINAL_BARBERSHOP);
  });

  it("should update one field from authenticated barbershop", async () => {
    const EXPECTED_FINAL_PHONE = BaseFactory.makePhone();

    const result = await BaseRequest.put("barbershops")
      .send({
        phone: EXPECTED_FINAL_PHONE,
      })
      .set("x-access-token", AUTHENTICATED_BARBERSHOP.jwt.token);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("phone", EXPECTED_FINAL_PHONE);
    expect(result.body.data).toHaveProperty("street", null);
  });

  it("should not update an barbershop if access token is from client", async () => {
    const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({});

    const result = await BaseRequest.put("barbershops")
      .send({
        phone: BaseFactory.makePhone(),
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(403);
    expect(result.body.error).toHaveProperty("message", "Access denied");
  });

  it("should not update an authenticated barbershop if access-token is invalid", async () => {
    const result = await BaseRequest.put("barbershops")
      .send({
        phone: BaseFactory.makePhone(),
      })
      .set("x-access-token", "invalid-access-token");

    expect(result.status).toBe(403);
    expect(result.body.error).toHaveProperty("message", "Access denied");
  });

  afterEach(async () => {
    await queries.barbershop.delete({
      where: {
        id_barbershop: AUTHENTICATED_BARBERSHOP.barbershop.id,
      },
    });
  });
});
