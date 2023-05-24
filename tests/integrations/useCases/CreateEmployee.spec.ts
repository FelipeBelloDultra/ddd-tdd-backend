import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { Employee } from "~/domain/entity/Employee";
import { Barbershop } from "~/domain/entity/Barbershop";
import { CreateEmployee } from "~/application/useCases/CreateEmployee";

describe("CreateEmployee", () => {
  const fakeRepositoryFactory = new FakeRepositoryFactory();
  const barbershopRepository =
    fakeRepositoryFactory.createBarbershopRepository();
  const employeeRepository = fakeRepositoryFactory.createEmployeeRepository();
  const appointmentRepository =
    fakeRepositoryFactory.createAppointmentRepository();
  const barbershop = Barbershop.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  let createEmployee: CreateEmployee;

  beforeEach(async () => {
    await barbershopRepository.create(barbershop);

    createEmployee = new CreateEmployee({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
      createAppointmentRepository: () => appointmentRepository,
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

  it("should not be able to create Employee if email already used by other employee", async () => {
    const email = faker.internet.email();

    const employee = Employee.create({
      name: faker.person.fullName(),
      email: email,
      phone: faker.phone.number(),
      avatarUrl: faker.internet.avatar(),
      barbershopId: barbershop.id,
    });

    await employeeRepository.create(employee);

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

  it("should not be able to create Employee if email already used by barbershop", async () => {
    await expect(
      createEmployee.execute({
        name: faker.person.fullName(),
        email: barbershop.email,
        avatarUrl: faker.internet.avatar(),
        barbershopId: barbershop.id,
        phone: faker.phone.number(),
      })
    ).rejects.toThrowError("Email already registered");
  });
});
