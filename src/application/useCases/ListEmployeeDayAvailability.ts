import { DateService } from "~/domain/entity/DateService";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";

interface IListEmployeeDayAvailability {
  employeeId: string;
  month: number;
  year: number;
  day: number;
}

export class ListEmployeeDayAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: IListEmployeeDayAvailability): Promise<
    {
      hour: number;
      available: boolean;
    }[]
  > {
    const appointments =
      await this.appointmentRepository.findAllInDayFromEmployee({
        month: data.month,
        year: data.year,
        employeeId: data.employeeId,
        day: data.day,
      });

    const START_HOUR = 8;
    const MAX_APPOINTMENTS_PER_DAY = 10;

    const eachHourArray = Array.from(
      { length: MAX_APPOINTMENTS_PER_DAY },
      (_, index) => index + START_HOUR
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => new Date(appointment.date).getHours() === hour
      );

      const compareDate = new Date(data.year, data.month - 1, data.day, hour);

      return {
        hour,
        available:
          !hasAppointmentInHour &&
          DateService.isAfter({
            date: compareDate,
            dateToCompare: currentDate,
          }),
      };
    });

    return availability;
  }
}
