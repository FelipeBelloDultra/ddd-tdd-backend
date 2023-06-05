import { describe, it, expect } from "vitest";

import { Employee } from "@modules/employee/domain/employee/Employee";

import { BaseFactory } from "../BaseFactory";
import { EmployeeFactory } from "./EmployeeFactory";

describe("EmployeeFactory.ts", () => {
  it("should create an instance of Employee", () => {
    const result = EmployeeFactory.create({});

    expect(result).toBeInstanceOf(Employee);
  });

  it("should create an instance of Employee with custom fields", () => {
    const email = BaseFactory.makeEmail();

    const result = EmployeeFactory.create({
      email,
    });

    expect(result.email.value).toBe(email);
  });
});
