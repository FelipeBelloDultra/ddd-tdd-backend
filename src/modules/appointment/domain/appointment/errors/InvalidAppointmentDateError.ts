import { DomainError } from "@core/domain/errors/DomainError";

export class InvalidAppointmentDateError extends Error implements DomainError {
  constructor(date: Date) {
    super(`Hour ${date} is not available`);
    this.name = InvalidAppointmentDateError.name;
  }
}
