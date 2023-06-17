import {
  describe,
  it,
  expect,
  beforeAll,
  vi,
  afterAll,
  beforeEach,
} from "vitest";

import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";
import { ClientMapper } from "@modules/client/application/mappers/ClientMapper";
import { EmployeeMapper } from "@modules/employee/application/mappers/EmployeeMapper";
import { AppointmentMapper } from "@modules/appointment/application/mappers/AppointmentMapper";

import { ClientFactory } from "@test/factory/entity/ClientFactory";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";
import { AppointmentFactory } from "@test/factory/entity/AppointmentFactory";
import { BaseRequest } from "@test/factory/BaseRequest";

import { queries } from "@infra/database/queries";

const CREATED_BARBERSHOP = BarbershopFactory.create({});
const CREATED_EMPLOYEE = EmployeeFactory.create({
  barbershopId: CREATED_BARBERSHOP.id,
});
const AUTHENTICATED_CLIENT = ClientFactory.createAndAuthenticate({});

describe("E2E - /appointments - [POST]", () => {
  beforeAll(() => {
    vi.useFakeTimers();

    const date = new Date("2000-01-01T08:00:00");
    vi.setSystemTime(date);
  });

  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(CREATED_BARBERSHOP),
    });
    await queries.employee.create({
      data: EmployeeMapper.toPersistence(CREATED_EMPLOYEE),
    });
    await queries.client.create({
      data: await ClientMapper.toPersistence(AUTHENTICATED_CLIENT.client),
    });
  });

  beforeEach(async () => {
    await queries.appointment.deleteMany();
  });

  it("should schedule an appointment", async () => {
    const CURRENT_DATE = new Date();

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: CURRENT_DATE,
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveProperty("date", CURRENT_DATE.toJSON());
    expect(result.body.error).toBeUndefined();
  });

  it("should not schedule an appointment if appointment already booked", async () => {
    const EXISTENT_APPOINTMENT_DATE = new Date("2000-01-01T10:00:00");

    await queries.appointment.create({
      data: AppointmentMapper.toPersistence(
        AppointmentFactory.create({
          date: EXISTENT_APPOINTMENT_DATE,
          clientId: AUTHENTICATED_CLIENT.client.id,
          employeeId: CREATED_EMPLOYEE.id,
        })
      ),
    });

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: EXISTENT_APPOINTMENT_DATE,
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty(
      "error",
      "This appointment is already booked"
    );
  });

  it("should not schedule an appointment if date is past", async () => {
    const PAST_DATE = new Date("1999-12-01T08:00:00");

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: PAST_DATE,
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty(
      "error",
      `Hour ${PAST_DATE} is not available`
    );
  });

  it("should not schedule an appointment if date is before 8am", async () => {
    const DATE_BEFORE_WORK_TIME = new Date("2000-01-01T07:00:00");

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: DATE_BEFORE_WORK_TIME,
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty(
      "error",
      `Hour ${DATE_BEFORE_WORK_TIME} is not available`
    );
  });

  it("should not schedule an appointment if date is after 17am", async () => {
    const DATE_AFTER_WORK_TIME = new Date("2000-01-01T18:00:00");

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: DATE_AFTER_WORK_TIME,
      })
      .set("x-access-token", AUTHENTICATED_CLIENT.jwt.token);

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty(
      "error",
      `Hour ${DATE_AFTER_WORK_TIME} is not available`
    );
  });

  it("should not schedule an appointment if access-token is invalid/empty", async () => {
    const result = await BaseRequest.post("/appointments").send({
      employeeId: CREATED_EMPLOYEE.id,
      date: new Date(),
    });

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("error", "Access denied");
  });

  it("should not schedule an appointment if access-token is from barbershop", async () => {
    const AUTHENTICATED_BARBERSHOP = BarbershopFactory.createAndAuthenticate(
      {}
    );

    const result = await BaseRequest.post("/appointments")
      .send({
        employeeId: CREATED_EMPLOYEE.id,
        date: new Date(),
      })
      .set("x-access-token", AUTHENTICATED_BARBERSHOP.jwt.token);

    expect(result.status).toBe(403);
    expect(result.body).toHaveProperty("error", "Access denied");
  });

  afterAll(() => {
    vi.clearAllTimers();
  });
});
