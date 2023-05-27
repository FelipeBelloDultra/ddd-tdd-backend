import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "~/domain/entity/Barbershop";
import { Employee } from "~/domain/entity/Employee";
import { CreateBarbershop } from "~/application/useCases/CreateBarbershop";

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

  it("should not be able to create Barbershop if email already registered by other barbershop", async () => {
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

  it("should not be able to create Barbershop if email already registered by employee", async () => {
    const email = faker.internet.email();

    const employee = Employee.create({
      name: faker.person.fullName(),
      email,
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: faker.string.uuid(),
    });

    await fakeRepositoryFactory.employeeRepository.create(employee);

    await expect(
      createBarbershop.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
