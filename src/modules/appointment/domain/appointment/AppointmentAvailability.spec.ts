import { describe, beforeAll, it, vi, afterAll, expect } from "vitest";

import { BaseFactory } from "@test/factory/BaseFactory";

import { AppointmentAvailability } from "./AppointmentAvailability";
import { Appointment } from "./Appointment";
import { AppointmentDate } from "./AppointmentDate";

const YEAR = "2000";
const MONTH = "02";
const DAY = "01";
const MAX_APPOINTMENTS_PER_DAY = 10;
const START_WORK_TIME_AT = 8;

describe("AppointmentAvailability.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should return an appointment availability by month", () => {
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-02T08:00:00`));

    const employeeId = BaseFactory.makeUuid();
    const scheduledHoursPerDay = Array.from(
      { length: MAX_APPOINTMENTS_PER_DAY },
      (_, index) => (index + START_WORK_TIME_AT).toString().padStart(2, "0")
    );
    const appointments = scheduledHoursPerDay.map(
      (hour) =>
        Appointment.create({
          employeeId,
          clientId: BaseFactory.makeUuid(),
          date: AppointmentDate.create(
            new Date(`${YEAR}-${MONTH}-02T${hour}:00:00`)
          ).value as AppointmentDate,
        }).value as Appointment
    );

    const appointmentAvailability = new AppointmentAvailability(appointments);
    const result = appointmentAvailability.checkMonth({
      month: Number(MONTH),
      year: Number(YEAR),
    });

    expect(result).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: false },
        { day: 3, available: true },
      ])
    );
  });

  it("should return an appointment availability by day", () => {
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-${DAY}T08:00:00`));

    vi.spyOn(Date, "now").mockImplementationOnce(() =>
      new Date(`${YEAR}-${MONTH}-${DAY}T10:00:00`).getTime()
    );

    const employeeId = BaseFactory.makeUuid();

    const appointments = [
      Appointment.create({
        employeeId,
        clientId: BaseFactory.makeUuid(),
        date: AppointmentDate.create(
          new Date(`${YEAR}-${MONTH}-${DAY}T14:00:00`)
        ).value as AppointmentDate,
      }).value as Appointment,
      Appointment.create({
        employeeId,
        clientId: BaseFactory.makeUuid(),
        date: AppointmentDate.create(
          new Date(`${YEAR}-${MONTH}-${DAY}T16:00:00`)
        ).value as AppointmentDate,
      }).value as Appointment,
    ];

    const appointmentAvailability = new AppointmentAvailability(appointments);
    const result = appointmentAvailability.checkDay({
      day: Number(DAY),
      month: Number(MONTH),
      year: Number(YEAR),
    });

    const AVAILABLE_HOURS_TO_SCHEDULE = [11, 12, 13, 15, 17];
    const NOT_AVAILABLE_HOURS_TO_SCHEDULE = [8, 9, 10, 14, 16];

    expect(
      result
        .filter(({ hour }) => NOT_AVAILABLE_HOURS_TO_SCHEDULE.includes(hour))
        .every(({ available }) => available === false)
    ).toBe(true);
    expect(
      result
        .filter(({ hour }) => AVAILABLE_HOURS_TO_SCHEDULE.includes(hour))
        .every(({ available }) => available === true)
    ).toBe(true);
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
