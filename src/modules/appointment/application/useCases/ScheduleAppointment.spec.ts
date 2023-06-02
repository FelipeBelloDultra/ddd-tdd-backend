import {
  describe,
  beforeAll,
  beforeEach,
  it,
  vi,
  afterAll,
  expect,
} from "vitest";
import { faker } from "@faker-js/faker";
import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";
import { Barbershop } from "@modules/barbershop/domain/entity/Barbershop";
import { Employee } from "@modules/employee/domain/entity/Employee";
import { Appointment } from "@modules/appointment/domain/entity/Appointment";
import { ScheduleAppointment } from "./ScheduleAppointment";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

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

describe("ScheduleAppointment", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(barbershop);
    await fakeRepositoryFactory.employeeRepository.create(employee);

    scheduleAppointment = new ScheduleAppointment({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
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

  it("should not be able schedule an appointment if employee does not exists", async () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    await expect(
      scheduleAppointment.execute({
        employeeId: "non-existent-employee-id",
        clientId: faker.string.uuid(),
        date: new Date(),
      })
    ).rejects.toThrowError("Employee not found");
  });

  it("should not be able to schedule if another schedule exists", async () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    await fakeRepositoryFactory.appointmentRepository.create(
      Appointment.create({
        employeeId: employee.id,
        clientId: faker.string.uuid(),
        date: new Date(),
      })
    );

    await expect(
      scheduleAppointment.execute({
        employeeId: employee.id,
        clientId: faker.string.uuid(),
        date: new Date(),
      })
    ).rejects.toThrowError("This appointment is already booked");
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});