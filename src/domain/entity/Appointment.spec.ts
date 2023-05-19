import { faker } from "@faker-js/faker";
import { Appointment } from "./Appointment";

describe("Appointment.ts", () => {
  it("should create Appointment instance", () => {
    const appointment = Appointment.create({
      date: new Date(),
      clientId: faker.string.uuid(),
      employeeId: faker.string.uuid(),
    });

    expect(appointment).toBeInstanceOf(Appointment);
  });
});
