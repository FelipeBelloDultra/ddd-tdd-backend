import { describe, it, expect, beforeAll } from "vitest";

import { EmployeeMapper } from "@modules/employee/application/mappers/EmployeeMapper";
import { BarbershopMapper } from "@modules/barbershop/application/mappers/BarbershopMapper";

import { BaseRequest } from "@test/factory/BaseRequest";
import { BarbershopFactory } from "@test/factory/entity/BarbershopFactory";
import { EmployeeFactory } from "@test/factory/entity/EmployeeFactory";

import { queries } from "@infra/database/queries";

const FIRST_CREATED_BARBERSHOP = BarbershopFactory.create({});
const SECOND_CREATED_BARBERSHOP = BarbershopFactory.create({});

describe("E2E - /employees/[barbershopId] - [GET]", () => {
  beforeAll(async () => {
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(FIRST_CREATED_BARBERSHOP),
    });
    await queries.barbershop.create({
      data: await BarbershopMapper.toPersistence(SECOND_CREATED_BARBERSHOP),
    });

    await queries.employee.create({
      data: EmployeeMapper.toPersistence(
        EmployeeFactory.create({ barbershopId: FIRST_CREATED_BARBERSHOP.id })
      ),
    });
    await queries.employee.create({
      data: EmployeeMapper.toPersistence(
        EmployeeFactory.create({ barbershopId: FIRST_CREATED_BARBERSHOP.id })
      ),
    });

    await queries.employee.create({
      data: EmployeeMapper.toPersistence(
        EmployeeFactory.create({ barbershopId: SECOND_CREATED_BARBERSHOP.id })
      ),
    });
    await queries.employee.create({
      data: EmployeeMapper.toPersistence(
        EmployeeFactory.create({ barbershopId: SECOND_CREATED_BARBERSHOP.id })
      ),
    });
    await queries.employee.create({
      data: EmployeeMapper.toPersistence(
        EmployeeFactory.create({ barbershopId: SECOND_CREATED_BARBERSHOP.id })
      ),
    });
  });

  it("should list all employess by barbershop id (FIRST_CREATED_BARBERSHOP)", async () => {
    const result = await BaseRequest.get(
      `employees/${FIRST_CREATED_BARBERSHOP.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(2);
    expect(
      result.body.data.every(
        (item: { barbershopId: string }) =>
          item.barbershopId === FIRST_CREATED_BARBERSHOP.id
      )
    ).toBeTruthy();
  });

  it("should list all employess by barbershop id (SECOND_CREATED_BARBERSHOP)", async () => {
    const result = await BaseRequest.get(
      `employees/${SECOND_CREATED_BARBERSHOP.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(3);
    expect(
      result.body.data.every(
        (item: { barbershopId: string }) =>
          item.barbershopId === SECOND_CREATED_BARBERSHOP.id
      )
    ).toBeTruthy();
  });
});
