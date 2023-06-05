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

import { BaseFactory } from "@test/factory/BaseFactory";
import { AppointmentFactory } from "@test/factory/entity/AppointmentFactory";

import { DateService } from "@core/domain/DateService";

import { ListEmployeeMonthAvailability } from "./ListEmployeeMonthAvailability";

const fakeRepositoryFactory = FakeRepositoryFactory.create();

const YEAR = "2000";
const MONTH = "02";
const MAX_APPOINTMENTS_PER_DAY = 10;
const START_WORK_TIME_AT = 8;

let listEmployeeMonthAvailability: ListEmployeeMonthAvailability;

describe("ListEmployeeMonthAvailability.ts", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    listEmployeeMonthAvailability = new ListEmployeeMonthAvailability({
      createBarbershopRepository: () =>
        fakeRepositoryFactory.barbershopRepository,
      createEmployeeRepository: () => fakeRepositoryFactory.employeeRepository,
      createAppointmentRepository: () =>
        fakeRepositoryFactory.appointmentRepository,
      createClientRepository: () => fakeRepositoryFactory.clientRepository,
    });
  });

  it("should list all month days availability", async () => {
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-01T10:00:00`));

    const employeeMonthAvailability =
      await listEmployeeMonthAvailability.execute({
        employeeId: BaseFactory.makeUuid(),
        month: Number(MONTH),
        year: Number(YEAR),
      });
    const result = employeeMonthAvailability.value as {
      day: number;
      available: boolean;
    }[];

    expect(result.length).toEqual(
      DateService.getDaysInMonth({
        month: Number(MONTH) - 1,
        year: Number(YEAR),
      })
    );
    expect(result).toEqual(
      expect.arrayContaining([
        { day: 1, available: true },
        { day: 2, available: true },
        { day: 3, available: true },
      ])
    );
  });

  it("should list available days in month with appointments scheduled", async () => {
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-02T08:00:00`));

    const employeeId = BaseFactory.makeUuid();
    const scheduledHoursPerDay = Array.from(
      { length: MAX_APPOINTMENTS_PER_DAY },
      (_, index) => (index + START_WORK_TIME_AT).toString().padStart(2, "0")
    );

    const promises = scheduledHoursPerDay.map((hour) =>
      fakeRepositoryFactory.appointmentRepository.create(
        AppointmentFactory.create({
          employeeId,
          date: new Date(`${YEAR}-${MONTH}-02T${hour}:00:00`),
        })
      )
    );

    await Promise.all(promises);

    const employeeMonthAvailability =
      await listEmployeeMonthAvailability.execute({
        employeeId,
        month: Number(MONTH),
        year: Number(YEAR),
      });
    const result = employeeMonthAvailability.value as {
      day: number;
      available: boolean;
    }[];

    expect(result).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: false },
        { day: 3, available: true },
      ])
    );
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
