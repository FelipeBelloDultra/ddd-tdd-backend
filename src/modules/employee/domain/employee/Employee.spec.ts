import { describe, it, expect } from "vitest";

import { EmployeeFactory } from "@test/factory/EmployeeFactory";

import { Employee } from "./Employee";

describe("Employee.ts", () => {
  it("should create Employee instance", () => {
    const employee = Employee.create(EmployeeFactory.create({}));

    expect(employee.isRight()).toBeTruthy();
  });
});
