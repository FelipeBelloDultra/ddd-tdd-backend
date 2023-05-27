import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { Client } from "~/domain/entity/Client";
import { CreateClient } from "~/application/useCases/CreateClient";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

let createClient: CreateClient;

describe("CreateClient.ts", () => {
  beforeEach(() => {
    createClient = new CreateClient({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should create Client", async () => {
    const result = await createClient.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not be able create Client if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.clientRepository.create(
      Client.create({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    );

    await expect(
      createClient.execute({
        name: faker.person.fullName(),
        email,
        password: faker.internet.password(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
