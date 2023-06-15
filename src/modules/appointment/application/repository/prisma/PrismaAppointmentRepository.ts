import { prisma } from "@infra/prisma/client";

import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import {
  AppointmentMapper,
  IPersistenceAppointment,
} from "@modules/appointment/application/mappers/AppointmentMapper";

import { IAppointmentRepository } from "../IAppointmentRepository";

export class PrismaAppointmentRepository implements IAppointmentRepository {
  public async create(data: Appointment): Promise<Appointment> {
    const toPersistence = AppointmentMapper.toPersistence(data);

    await prisma.appointment.create({
      data: toPersistence,
    });

    return data;
  }

  public async findAllInDayFromEmployee(data: {
    day: number;
    month: number;
    year: number;
    employeeId: string;
  }): Promise<Appointment[]> {
    const finded = await prisma.$queryRaw<IPersistenceAppointment[]>`
      SELECT *
      FROM appointments
      WHERE
        employee_id = ${data.employeeId}
        AND EXTRACT(MONTH FROM date) = ${data.month}
        AND EXTRACT(YEAR FROM date) = ${data.year};
        AND EXTRACT(DAY FROM date) = ${data.day};
    `;

    return finded.map((appointment) => AppointmentMapper.toDomain(appointment));
  }

  public async findAllInMonthFromEmployee(data: {
    month: number;
    year: number;
    employeeId: string;
  }): Promise<Appointment[]> {
    const finded = await prisma.$queryRaw<IPersistenceAppointment[]>`
      SELECT *
      FROM appointments
      WHERE
        employee_id = ${data.employeeId}
        AND EXTRACT(MONTH FROM date) = ${data.month}
        AND EXTRACT(YEAR FROM date) = ${data.year};
  `;

    return finded.map((appointment) => AppointmentMapper.toDomain(appointment));
  }

  public async findByDate(
    date: Date,
    employeeId: string
  ): Promise<Appointment | undefined> {
    const finded = await prisma.appointment.findUnique({
      where: {
        date: date,
        id_appointment: employeeId,
      },
    });

    if (!finded) return undefined;

    return AppointmentMapper.toDomain(finded);
  }
}
