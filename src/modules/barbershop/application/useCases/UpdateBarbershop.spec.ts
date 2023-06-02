import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";
import { UpdateBarbershop } from "./UpdateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = Barbershop.create({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

let updateBarbershop: UpdateBarbershop;

describe("UpdateBarbershop", () => {
  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    updateBarbershop = new UpdateBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should update all Barbershop fields", async () => {
    const dataToUpdate = {
      id: barbershop.id,
      name: `New ${barbershop.name}`,
      street: faker.location.street(),
      neighborhood: faker.location.secondaryAddress(),
      number: faker.location.buildingNumber(),
      avatarUrl: faker.internet.avatar(),
      phone: faker.phone.number(),
    };

    const result = await updateBarbershop.execute(dataToUpdate);

    expect(result).toBeInstanceOf(Barbershop);
    expect(result.id).toBe(barbershop.id);
    expect(result.phone).toBe(dataToUpdate.phone);
  });

  it("should update one Barbershop field", async () => {
    const result = await updateBarbershop.execute({
      id: barbershop.id,
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
