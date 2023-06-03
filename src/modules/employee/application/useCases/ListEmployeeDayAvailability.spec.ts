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

import { Appointment } from "@modules/appointment/domain/Appointment";

import { ListEmployeeDayAvailability } from "./ListEmployeeDayAvailability";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const DAY = "01";
const YEAR = "2000";
const MONTH = "02";

let listEmployeeDayAvailability: ListEmployeeDayAvailability;

describe("ListEmployeeDayAvailability.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    listEmployeeDayAvailability = new ListEmployeeDayAvailability({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should list available appointments", async () => {
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-02T08:00:00`));
    vi.spyOn(Date, "now").mockImplementationOnce(() =>
      new Date(`${YEAR}-${MONTH}-${DAY}T10:00:00`).getTime()
    );

    const employeeId = faker.string.uuid();

    await Promise.all([
      fakeRepositoryFactory.appointmentRepository.create(
        Appointment.create({
          employeeId,
          clientId: faker.string.uuid(),
          date: new Date(`${YEAR}-${MONTH}-${DAY}T14:00:00`),
        })
      ),
      fakeRepositoryFactory.appointmentRepository.create(
        Appointment.create({
          employeeId,
          clientId: faker.string.uuid(),
          date: new Date(`${YEAR}-${MONTH}-${DAY}T16:00:00`),
        })
      ),
    ]);

    const employeeDayAvailability = await listEmployeeDayAvailability.execute({
      employeeId,
      month: Number(MONTH),
      year: Number(YEAR),
      day: Number(DAY),
    });
    const result = employeeDayAvailability.value as {
      hour: number;
      available: boolean;
    }[];

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
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
});
