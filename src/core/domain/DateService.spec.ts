import { describe, it, expect } from "vitest";

import { DateService } from "./DateService";

describe("DateService.ts", () => {
  it("should get all days of month", () => {
    const YEAR = 2023;
    const MONTH = 2;

    expect(DateService.getDaysInMonth({ year: YEAR, month: MONTH })).toEqual(
      28
    );
  });

  it("should get day from date object", () => {
    const YEAR = 2023;
    const MONTH = 2;
    const DATE = 10;

    expect(DateService.getDate(new Date(YEAR, MONTH, DATE))).toEqual(DATE);
  });

  it("should verify if first date is after second data", () => {
    expect(
      DateService.isAfter({
        date: new Date("2000-01-01"),
        dateToCompare: new Date("2000-02-01"),
      })
    ).toBeFalsy();
  });
});
