import { describe, beforeAll, it, vi, afterAll, expect } from "vitest";

import { AppointmentDate } from "./AppointmentDate";

describe("AppointmentDate.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should create AppointmentDate instance if time is between 8am and 17pm", () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const appointmentDate = AppointmentDate.create(date);

    expect(appointmentDate.isRight()).toBeTruthy();
  });

  it("should not create AppointmentDate instance if time is before 8am or after 17pm", () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    const appointmentDate = AppointmentDate.create(date);

    expect(appointmentDate.isLeft()).toBeTruthy();
  });

  it("should not create AppointmentDate instance if is before current date", () => {
    const date = new Date("2000-01-01");

    const appointmentDate = AppointmentDate.create(date);

    expect(appointmentDate.isLeft()).toBeTruthy();
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
