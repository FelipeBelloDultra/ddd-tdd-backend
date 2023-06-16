import { Either, left, right } from "@core/logic/Either";
import { IUseCase } from "@core/application/useCases/IUseCase";

import { Appointment } from "@modules/appointment/domain/appointment/Appointment";
import { AppointmentDate } from "@modules/appointment/domain/appointment/AppointmentDate";
import { IFindByDateAppointmentRepository } from "@modules/appointment/application/repository/IFindByDateAppointmentRepository";
import { ICreateAppointmentRepository } from "@modules/appointment/application/repository/ICreateAppointmentRepository";
import { IFindByIdEmployeeRepository } from "@modules/employee/application/repository/IFindByIdEmployeeRepository";

import { EmployeeNotFoundError } from "./errors/EmployeeNotFoundError";
import { AppointmentAlreadyBookedError } from "./errors/AppointmentAlreadyBookedError";

interface Input {
  employeeId: string;
  clientId: string;
  date: Date;
}

type Output = Either<
  EmployeeNotFoundError | AppointmentAlreadyBookedError,
  Appointment
>;

type IScheduleAppointmentRepositories = ICreateAppointmentRepository &
  IFindByDateAppointmentRepository;

interface IScheduleAppointment {
  scheduleAppointmentRepositories: IScheduleAppointmentRepositories;
  findByIdEmployeeRepository: IFindByIdEmployeeRepository;
}

export class ScheduleAppointment implements IUseCase<Input, Output> {
  private readonly scheduleAppointmentRepositories: IScheduleAppointmentRepositories;
  private readonly findByIdEmployeeRepository: IFindByIdEmployeeRepository;

  constructor({
    scheduleAppointmentRepositories,
    findByIdEmployeeRepository,
  }: IScheduleAppointment) {
    this.scheduleAppointmentRepositories = scheduleAppointmentRepositories;
    this.findByIdEmployeeRepository = findByIdEmployeeRepository;
  }

  public async execute(data: Input): Promise<Output> {
    const existentEmployee = await this.findByIdEmployeeRepository.findById(
      data.employeeId
    );

    if (!existentEmployee) {
      return left(new EmployeeNotFoundError());
    }

    const findAppointmentInSameDate =
      await this.scheduleAppointmentRepositories.findByDate(
        data.date,
        data.employeeId
      );

    if (findAppointmentInSameDate)
      return left(new AppointmentAlreadyBookedError());

    const date = AppointmentDate.create(new Date(data.date));

    if (date.isLeft()) {
      return left(date.value);
    }

    const appointment = Appointment.create({
      employeeId: data.employeeId,
      clientId: data.clientId,
      date: date.value,
    });

    if (appointment.isLeft()) {
      return left(appointment.value);
    }

    await this.scheduleAppointmentRepositories.create(appointment.value);

    return right(appointment.value);
  }
}
