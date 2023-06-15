import { UseCaseError } from "@core/domain/errors/UseCaseError";

export class AppointmentAlreadyBookedError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("This appointment is already booked");
    this.name = AppointmentAlreadyBookedError.name;
  }
}
