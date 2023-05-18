// Packages
import { describe, it, expect, beforeEach } from "vitest";
import { faker } from "@faker-js/faker";

// Repositories
import { FakeBarbershopRepository } from "~/repositories/fakes/FakeBarbershopRepository";

// Domain
import { Barbershop } from "~/domain/entity/Barbershop";

// Use case
import { UpdateBarbershop } from "./UpdateBarbershop";

const barbershop = new Barbershop({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("UpdateBarbershop", () => {
  let fakeBarbershopRepository: FakeBarbershopRepository;
  let updateBarbershop: UpdateBarbershop;

  beforeEach(() => {
    fakeBarbershopRepository = new FakeBarbershopRepository();
    fakeBarbershopRepository.create({
      id: barbershop._id,
      email: barbershop.email,
      name: barbershop.name,
      password: barbershop.password,
    });
    updateBarbershop = new UpdateBarbershop(fakeBarbershopRepository);
  });

  it("should update all Barbershop fields", async () => {
    const dataToUpdate = {
      id: barbershop._id,
      name: `New ${barbershop.name}`,
      street: faker.location.street(),
      neighborhood: faker.location.secondaryAddress(),
      number: faker.location.buildingNumber(),
      avatarUrl: faker.internet.avatar(),
      phone: faker.phone.number(),
    };

    const result = await updateBarbershop.execute(dataToUpdate);

    expect(result).toBeInstanceOf(Barbershop);
    expect(result._id).toBe(barbershop._id);
    expect(result.phone).toBe(dataToUpdate.phone);
  });

  it("should update one Barbershop field", async () => {
    const result = await updateBarbershop.execute({
      id: barbershop._id,
      name: faker.person.fullName(),
    });

    expect(result).toBeInstanceOf(Barbershop);
    expect(result.name).not.toBe(barbershop.name);
    expect(result.phone).toBeFalsy();
  });

  it("should not update Barbershop by id if user does not exists", async () => {
    await expect(
      updateBarbershop.execute({
        id: "no-exist",
        name: faker.person.fullName(),
      })
    ).rejects.toThrowError("User does not exist");
  });
});
