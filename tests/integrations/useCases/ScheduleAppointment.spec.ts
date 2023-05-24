import { vi } from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "~/infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "~/domain/entity/Barbershop";
import { Employee } from "~/domain/entity/Employee";
import { ScheduleAppointment } from "~/application/useCases/ScheduleAppointment";

describe("ScheduleAppointment", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

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
  const employee = Employee.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    avatarUrl: faker.internet.avatar(),
    barbershopId: barbershop.id,
    phone: faker.phone.number(),
  });

  let scheduleAppointment: ScheduleAppointment;

  beforeEach(async () => {
    await barbershopRepository.create(barbershop);
    await employeeRepository.create(employee);

    scheduleAppointment = new ScheduleAppointment({
      createBarbershopRepository: () => barbershopRepository,
      createEmployeeRepository: () => employeeRepository,
      createAppointmentRepository: () => appointmentRepository,
    });
  });

  it("should schedule a new client appointment", async () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const result = await scheduleAppointment.execute({
      employeeId: employee.id,
      clientId: faker.string.uuid(),
      date: new Date(),
    });

    expect(result).toBeTruthy();
    expect(result).toBeTypeOf("string");
  });

  it("should not schedule a new appointment if hours is not available", async () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    await expect(
      scheduleAppointment.execute({
        employeeId: employee.id,
        clientId: faker.string.uuid(),
        date: new Date(),
      })
    ).rejects.toThrowError("Hour is not available");
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
