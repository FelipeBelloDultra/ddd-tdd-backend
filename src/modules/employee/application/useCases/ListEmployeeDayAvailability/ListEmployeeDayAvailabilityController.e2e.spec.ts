import {
  describe,
  it,
  expect,
  beforeAll,
  vi,
  afterAll,
  beforeEach,
} from "vitest";

import { EmployeeMapper } from "@modules/employee/application/mappers/EmployeeMapper";
import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";
import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";

import { BaseRequest } from "@test/factory/BaseRequest";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";
import { ClientFactory } from "@test/factory/entity/ClientFactory";

import { queries } from "@infra/database/queries";
import { AppointmentFactory } from "@test/factory/entity/AppointmentFactory";
import { AppointmentMapper } from "@modules/appointment/application/mappers/AppointmentMapper";

const DAY = "01";
const YEAR = "2000";
const MONTH = "02";

const CREATED_BARBERSHOP = BarbershopFactory.create({});
const CREATED_EMPLOYEE = EmployeeFactory.create({
  barbershopId: CREATED_BARBERSHOP.id,
});
const CREATED_CLIENT = ClientFactory.create({});

describe("E2E - /employees/[employeeId]/month-availability - [GET]", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-${DAY}T07:00:00`));
  });

  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(CREATED_BARBERSHOP),
    });
    await queries.employee.create({
      data: EmployeeMapper.toPersistence(CREATED_EMPLOYEE),
    });
    await queries.client.create({
      data: await ClientMapper.toPersistence(CREATED_CLIENT),
    });
  });

  beforeEach(async () => {
    await queries.appointment.deleteMany();
  });

  it("should list all available appointments by employee id with query strings (day, month, year", async () => {
    vi.spyOn(Date, "now").mockImplementationOnce(() =>
      new Date(`${YEAR}-${MONTH}-${DAY}T10:00:00`).getTime()
    );

    const FIRST_CREATED_APPOINTMENT = AppointmentFactory.create({
      clientId: CREATED_CLIENT.id,
      employeeId: CREATED_EMPLOYEE.id,
      date: new Date(`${YEAR}-${MONTH}-${DAY}T14:00:00`),
    });
    const SECOND_CREATED_APPOINTMENT = AppointmentFactory.create({
      clientId: CREATED_CLIENT.id,
      employeeId: CREATED_EMPLOYEE.id,
      date: new Date(`${YEAR}-${MONTH}-${DAY}T16:00:00`),
    });

    await Promise.all([
      queries.appointment.create({
        data: AppointmentMapper.toPersistence(FIRST_CREATED_APPOINTMENT),
      }),
      queries.appointment.create({
        data: AppointmentMapper.toPersistence(SECOND_CREATED_APPOINTMENT),
      }),
    ]);

    const queryStrings = `day=${DAY}&month=${MONTH}&year=${YEAR}`;

    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/day-availability?${queryStrings}`
    );

    const AVAILABLE_HOURS_TO_SCHEDULE = [11, 12, 13, 15, 17];
    const NOT_AVAILABLE_HOURS_TO_SCHEDULE = [8, 9, 10, 14, 16];

    expect(result.status).toBe(200);
    expect(
      result.body.data
        .filter(({ hour }: { hour: number }) =>
          NOT_AVAILABLE_HOURS_TO_SCHEDULE.includes(hour)
        )
        .every(({ available }: { available: boolean }) => available === false)
    ).toBeTruthy();
    expect(
      result.body.data
        .filter(({ hour }: { hour: number }) =>
          AVAILABLE_HOURS_TO_SCHEDULE.includes(hour)
        )
        .every(({ available }: { available: boolean }) => available === true)
    ).toBeTruthy();
  });

  it("should list an current day availability if all query params is empty", async () => {
    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/day-availability`
    );

    expect(result.status).toBe(200);
    expect(
      result.body.data.every(
        ({ available }: { available: boolean }) => available === true
      )
    ).toBeTruthy();
  });

  it("should list an unavailability if some query params is in past", async () => {
    const PAST_MONTH = "01";

    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/day-availability?month=${PAST_MONTH}`
    );

    expect(result.status).toBe(200);
    expect(
      result.body.data.every(
        ({ available }: { available: boolean }) => available === false
      )
    ).toBeTruthy();
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
});
