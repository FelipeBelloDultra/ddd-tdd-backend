import { describe, it, expect, beforeAll, vi, afterAll } from "vitest";
import { AppointmentFactory } from "./AppointmentFactory";

import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

describe("AppointmentFactory.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should create an instance of Appointment", () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const result = AppointmentFactory.create({});

    expect(result).toBeInstanceOf(Appointment);
  });

  it("should create an instance of Appointment with other date", () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const newDate = new Date(date.setHours(10));

    const result = AppointmentFactory.create({ date: newDate });

    expect(result.date.value).toBe(newDate);
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
