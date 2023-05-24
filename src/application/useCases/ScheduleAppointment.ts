import { Appointment } from "~/domain/entity/Appointment";
import { IAppointmentRepository } from "~/application/repository/IAppointmentRepository";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

interface IScheduleAppointment {
  employeeId: string;
  clientId: string;
  date: Date;
}

export class ScheduleAppointment {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: IScheduleAppointment): Promise<string> {
    const appointment = Appointment.create({
      employeeId: data.employeeId,
      clientId: data.clientId,
      date: data.date,
    });

    if (!appointment.hourIsAvailable()) {
      throw new Error("Hour is not available");
    }

    await this.appointmentRepository.create(appointment);

    return appointment.id;
  }
}
