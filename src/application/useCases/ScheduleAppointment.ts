import { Appointment } from "~/domain/entity/Appointment";
import { IAppointmentRepository } from "~/application/repository/IAppointmentRepository";
import { IEmployeeRepository } from "~/application/repository/IEmployeeRepository";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";

interface IScheduleAppointment {
  employeeId: string;
  clientId: string;
  date: Date;
}

export class ScheduleAppointment {
  private readonly appointmentRepository: IAppointmentRepository;
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(data: IScheduleAppointment): Promise<string> {
    const existentEmployee = await this.employeeRepository.findById(
      data.employeeId
    );

    if (!existentEmployee) {
      throw new Error("Employee not found");
    }

    const appointment = Appointment.create({
      employeeId: data.employeeId,
      clientId: data.clientId,
      date: data.date,
    });

    if (!appointment.hourIsAvailable()) {
      throw new Error("Hour is not available");
    }

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(data.date, data.employeeId);

    if (findAppointmentInSameDate)
      throw new Error("This appointment is already booked");

    await this.appointmentRepository.create(appointment);

    return appointment.id;
  }
}
