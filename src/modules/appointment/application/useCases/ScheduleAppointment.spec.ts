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

import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { AppointmentFactory } from "@test/factory/entity/AppointmentFactory";
import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";
import { BaseFactory } from "@test/factory/BaseFactory";

import { ScheduleAppointment } from "./ScheduleAppointment";

import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";
import { AppointmentAlreadyBookedError } from "./errors/AppointmentAlreadyBookedError";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const barbershop = BarbershopFactory.create({});
const employee = EmployeeFactory.create({
  barbershopId: barbershop.id,
});

let scheduleAppointment: ScheduleAppointment;

describe("ScheduleAppointment.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(async () => {
    await fakeRepositoryFactory.barbershopRepository.create(
      BarbershopFactory.create({})
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

    const result = await scheduleAppointment.execute({
      employeeId: employee.id,
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be able schedule an appointment if employee does not exists", async () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    const result = await scheduleAppointment.execute({
      employeeId: "non-existent-employee-id",
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(result.isLeft());
    expect(result.value).toEqual(new EmployeeNotFoundError());
  });

  it("should not be able to schedule if another schedule exists", async () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    await fakeRepositoryFactory.appointmentRepository.create(
      AppointmentFactory.create({ employeeId: employee.id, date: new Date() })
    );

    const result = await scheduleAppointment.execute({
      employeeId: employee.id,
      clientId: BaseFactory.makeUuid(),
      date: new Date(),
    });

    expect(result.isLeft());
    expect(result.value).toEqual(new AppointmentAlreadyBookedError());
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
