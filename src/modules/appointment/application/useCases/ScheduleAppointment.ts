import { IRepositoryFactory } from "@core/application/factory/IRepositoryFactory";
import { Appointment } from "@modules/appointment/domain/Appointment";
import { IAppointmentRepository } from "@modules/appointment/application/repository/IAppointmentRepository";
import { IEmployeeRepository } from "@modules/employee/application/repository/IEmployeeRepository";
import { Either, left, right } from "@core/logic/Either";
import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";
import { UnavailableHoursError } from "./errors/UnavailableHoursError";
import { AppointmentAlreadyBookedError } from "./errors/AppointmentAlreadyBookedError";

interface IScheduleAppointment {
  employeeId: string;
  clientId: string;
  date: Date;
}

type IScheduleAppointmentResponse = Either<
  EmployeeNotFoundError | UnavailableHoursError | AppointmentAlreadyBookedError,
  string
>;

export class ScheduleAppointment {
  private readonly appointmentRepository: IAppointmentRepository;
  private readonly employeeRepository: IEmployeeRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
    this.employeeRepository = repositoryFactory.createEmployeeRepository();
  }

  public async execute(
    data: IScheduleAppointment
  ): Promise<IScheduleAppointmentResponse> {
    const existentEmployee = await this.employeeRepository.findById(
      data.employeeId
    );

    if (!existentEmployee) {
      return left(new EmployeeNotFoundError());
    }

    const appointment = Appointment.create({
      employeeId: data.employeeId,
      clientId: data.clientId,
      date: data.date,
    });

    if (!appointment.hourIsAvailable()) {
      return left(new UnavailableHoursError());
    }

    const findAppointmentInSameDate =
      await this.appointmentRepository.findByDate(data.date, data.employeeId);

    if (findAppointmentInSameDate)
      return left(new AppointmentAlreadyBookedError());

    await this.appointmentRepository.create(appointment);

    return right(appointment.id);
  }
}
