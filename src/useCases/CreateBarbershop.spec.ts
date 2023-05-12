import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeBarbershopRepository } from "~/repositories/fakes/FakeBarbershopRepository";
import { Barbershop } from "~/domain/Barbershop";
import { CreateBarbershop } from "./CreateBarbershop";

describe("CreateBarbershop.ts", () => {
  let createBarbershop: CreateBarbershop;
  let fakeBarbershopRepository: FakeBarbershopRepository;

  beforeEach(() => {
    fakeBarbershopRepository = new FakeBarbershopRepository();
    createBarbershop = new CreateBarbershop(fakeBarbershopRepository);
  });

  it("should create Barbershop", async () => {
    const result = await createBarbershop.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not be able to create Barbershop if email already registered", async () => {
    const email = faker.internet.email();

    const barbershop = new Barbershop({
      name: faker.person.fullName(),
      email,
      password: faker.internet.password(),
    });

    await fakeBarbershopRepository.create({
      id: barbershop._id,
      email,
      name: barbershop.name,
      password: barbershop.password,
    });
    await expect(
      createBarbershop.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
