import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import { AppointmentDate } from "@modules/appointment/domain/appointment/AppointmentDate";

import { BaseFactory } from "../BaseFactory";

interface ICreateAppointmentFactory {
  clientId?: string;
  employeeId?: string;
  date?: Date;
}

export class AppointmentFactory {
  static create(data: ICreateAppointmentFactory): Appointment {
    const appointment = Appointment.create({
      clientId: data.clientId || BaseFactory.makeUuid(),
      employeeId: data.employeeId || BaseFactory.makeUuid(),
      date: AppointmentDate.create(data.date || new Date())
        .value as AppointmentDate,
    });

    return appointment.value as Appointment;
  }
}
