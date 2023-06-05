import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import { AppointmentDate } from "@modules/appointment/domain/appointment/AppointmentDate";

import { BaseFactory } from "./BaseFactory";

interface ICreateAppointmentFactory {
  clientId?: string;
  employeeId?: string;
  date?: Date;
}

export class AppointmentFactory {
  static create({
    date = new Date(),
    clientId,
    employeeId,
  }: ICreateAppointmentFactory): Appointment {
    const appointment = Appointment.create({
      clientId: clientId || BaseFactory.makeUuid(),
      employeeId: employeeId || BaseFactory.makeUuid(),
      date: AppointmentDate.create(date).value as AppointmentDate,
    });

    return appointment.value as Appointment;
  }
}
