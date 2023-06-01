import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Employee } from "@modules/employee/domain/entity/Employee";
import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";
import { CreateEmployee } from "./CreateEmployee";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = Barbershop.create({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

let createEmployee: CreateEmployee;

describe("CreateEmployee", () => {
  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);

    createEmployee = new CreateEmployee({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should create Employee", async () => {
    const result = await createEmployee.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop.id,
      phone: faker.phone.number(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not be able create Employee if email already exists", async () => {
    const email = faker.internet.email();

    await fakeRepositoryFactory.employeeRepository.create(
      Employee.create({
        name: faker.person.fullName(),
        email: email,
        phone: faker.phone.number(),
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop.id,
      })
    );

    await expect(
      createEmployee.execute({
        name: faker.person.fullName(),
        email,
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop.id,
        phone: faker.phone.number(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
