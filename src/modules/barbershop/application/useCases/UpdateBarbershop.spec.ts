import { describe, beforeEach, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/Barbershop";
import { UpdateBarbershop } from "./UpdateBarbershop";
import { BarbershopNotFoundError } from "./errors/BarbershopNotFoundError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = Barbershop.create({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

let updateBarbershop: UpdateBarbershop;

describe("UpdateBarbershop.ts", () => {
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

    expect(result.value).toBeInstanceOf(Barbershop);
    expect(result.value).toEqual(
      expect.objectContaining({ id: barbershop.id })
    );
    expect(result.value).toEqual(
      expect.objectContaining({ phone: dataToUpdate.phone })
    );
  });

  it("should update one Barbershop field", async () => {
    const result = await updateBarbershop.execute({
      id: barbershop.id,
      name: faker.person.fullName(),
    });

    expect(result.value).toBeInstanceOf(Barbershop);
    expect(result.value).not.toEqual(
      expect.objectContaining({ name: barbershop.name })
    );
    expect(result.value).toEqual(
      expect.objectContaining({ phone: barbershop.phone })
    );
  });

  it("should not update Barbershop by id if user does not exists", async () => {
    const result = await updateBarbershop.execute({
      id: "no-exist",
      name: faker.person.fullName(),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toEqual(new BarbershopNotFoundError());
  });
});
