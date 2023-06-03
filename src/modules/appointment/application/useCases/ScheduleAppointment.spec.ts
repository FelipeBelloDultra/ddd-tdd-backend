import {
  describe,
  beforeAll,
  beforeEach,
  it,
  vi,
  afterAll,
  expect,
} from "vitest";

import { FakeRepositoryFactory } from "@infra/factory/fakes/FakeRepositoryFactory";

import { Employee } from "@modules/employee/domain/Employee";
import { Appointment } from "@modules/appointment/domain/Appointment";

import { BarbershopFactory } from "@test/factory/BarbershopFactory";
import { BaseFactory } from "@test/factory/BaseFactory";

import { ScheduleAppointment } from "./ScheduleAppointment";

import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";
import { UnavailableHoursError } from "./errors/UnavailableHoursError";
import { AppointmentAlreadyBookedError } from "./errors/AppointmentAlreadyBookedError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = BarbershopFactory.create();
const employee = Employee.create({
  name: BaseFactory.makeFullName(),
  email: BaseFactory.makeEmail(),
  avatarUrl: BaseFactory.makeAvatar(),
  barbershopId: barbershop.id,
  phone: BaseFactory.makePhone(),
});

let scheduleAppointment: ScheduleAppointment;

describe("ScheduleAppointment.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(
      BarbershopFactory.create()
    );
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
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not schedule a new appointment if hours is not available", async () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    const error = await scheduleAppointment.execute({
      employeeId: employee.id,
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(error.isLeft());
    expect(error.value).toEqual(new UnavailableHoursError());
  });

  it("should not be able schedule an appointment if employee does not exists", async () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    const error = await scheduleAppointment.execute({
      employeeId: "non-existent-employee-id",
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(error.isLeft());
    expect(error.value).toEqual(new EmployeeNotFoundError());
  });

  it("should not be able to schedule if another schedule exists", async () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    await fakeRepositoryFactory.appointmentRepository.create(
      Appointment.create({
        employeeId: employee.id,
        clientId: BaseFactory.makeUuid(),
        date: new Date(),
      })
    );

    const error = await scheduleAppointment.execute({
      employeeId: employee.id,
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(error.isLeft());
    expect(error.value).toEqual(new AppointmentAlreadyBookedError());
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
