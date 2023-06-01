import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";
import { CreateBarbershop } from "./CreateBarbershop";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createBarbershop: CreateBarbershop;

describe("CreateBarbershop.ts", () => {
  beforeEach(() => {
    createBarbershop = new CreateBarbershop({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
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

  it("should not be able create Barbershop if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.barbershopRepository.create(
      Barbershop.create({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    );

    await expect(
      createBarbershop.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
