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

const YEAR = "2000";
const MONTH = "02";

const MAX_APPOINTMENTS_PER_DAY = 10;
const START_WORK_TIME_AT = 8;

const TO_SCHEDULE_HOURS_IN_DAY = Array.from(
  { length: MAX_APPOINTMENTS_PER_DAY },
  (_, index) => (index + START_WORK_TIME_AT).toString().padStart(2, "0")
);

const CREATED_BARBERSHOP = BarbershopFactory.create({});
const CREATED_EMPLOYEE = EmployeeFactory.create({
  barbershopId: CREATED_BARBERSHOP.id,
});
const CREATED_CLIENT = ClientFactory.create({});

describe("E2E - /employees/[employeeId]/month-availability - [GET]", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(`${YEAR}-${MONTH}-02T07:00:00`));
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

  it("should list all available appointments in month by employee id with query strings (month, year)", async () => {
    await Promise.all(
      TO_SCHEDULE_HOURS_IN_DAY.map((hour) =>
        queries.appointment.create({
          data: AppointmentMapper.toPersistence(
            AppointmentFactory.create({
              clientId: CREATED_CLIENT.id,
              employeeId: CREATED_EMPLOYEE.id,
              date: new Date(`${YEAR}-${MONTH}-02T${hour}:00:00`),
            })
          ),
        })
      )
    );

    const queryStrings = `month=${MONTH}&year=${YEAR}`;

    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/month-availability?${queryStrings}`
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: false },
        { day: 3, available: true },
      ])
    );
  });

  it("should list an current day availability if all query params is empty", async () => {
    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/month-availability`
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 3, available: true },
      ])
    );
  });

  it("should list an unavailability if some query params is in past", async () => {
    const PAST_YEAR = "1999";

    const result = await BaseRequest.get(
      `employees/${CREATED_EMPLOYEE.id}/month-availability?month=${MONTH}&year=${PAST_YEAR}`
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
