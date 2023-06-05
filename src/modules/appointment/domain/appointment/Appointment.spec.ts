import { describe, beforeAll, it, vi, afterAll, expect } from "vitest";

import { AppointmentFactory } from "@test/factory/AppointmentFactory";

import { Appointment } from "./Appointment";

describe("Appointment.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should create Appointment instance", () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const appointment = Appointment.create(AppointmentFactory.create({}));

    expect(appointment.isRight).toBeTruthy();
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
