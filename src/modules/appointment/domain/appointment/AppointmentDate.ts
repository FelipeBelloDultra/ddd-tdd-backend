import { Either, right, left } from "@core/logic/Either";

import { InvalidAppointmentDateError } from "./errors/InvalidAppointmentDateError";

const START_WORK_TIME_AT = 8;
const FINISH_WORK_TIME_AT = 17;

export class AppointmentDate {
  private readonly date: Date;

  get value(): Date {
    return this.date;
  }

  private constructor(date: Date) {
    this.date = date;
  }

  static validate(date: Date): boolean {
    const hours = date.getHours();

    if (date.getTime() < new Date().getTime()) {
      return false;
    }

    if (hours < START_WORK_TIME_AT || hours > FINISH_WORK_TIME_AT) {
      return false;
    }

    return true;
  }

  static create(
    date: Date
  ): Either<InvalidAppointmentDateError, AppointmentDate> {
    if (!this.validate(date)) {
      return left(new InvalidAppointmentDateError(date));
    }

    return right(new AppointmentDate(date));
  }
}
