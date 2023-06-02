import { describe, beforeAll, it, vi, afterAll, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { Appointment } from "./Appointment";

describe("Appointment.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should create Appointment instance", () => {
    const appointment = Appointment.create({
      date: new Date(),
      clientId: faker.string.uuid(),
      employeeId: faker.string.uuid(),
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });

  it("should verify if Appointment date is valid if time is between 8am and 17pm", () => {
    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);

    const appointment = Appointment.create({
      date: new Date(),
      clientId: faker.string.uuid(),
      employeeId: faker.string.uuid(),
    });

    const result = appointment.hourIsAvailable();

    expect(result).toBeTruthy();
  });

  it("should verify if Appointment date is valid if time is before 8am or after 17pm", () => {
    const date = new Date("2000-01-01T07:00:00");
    vi.setSystemTime(date);

    const appointment = Appointment.create({
      date: new Date(),
      clientId: faker.string.uuid(),
      employeeId: faker.string.uuid(),
    });

    const result = appointment.hourIsAvailable();

    expect(result).toBeFalsy();
  });

  it("should verify if Appointment date is before current date", () => {
    const date = new Date("2000-01-01");

    const appointment = Appointment.create({
      date,
      clientId: faker.string.uuid(),
      employeeId: faker.string.uuid(),
    });

    const result = appointment.hourIsAvailable();

    expect(result).toBeFalsy();
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
