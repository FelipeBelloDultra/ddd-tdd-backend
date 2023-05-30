import { DateService } from "~/domain/entity/DateService";
import { IRepositoryFactory } from "../factory/IRepositoryFactory";
import { IAppointmentRepository } from "../repository/IAppointmentRepository";

interface IListEmployeeMonthAvailability {
  employeeId: string;
  month: number;
  year: number;
}

export class ListEmployeeMonthAvailability {
  private readonly appointmentRepository: IAppointmentRepository;

  constructor(repositoryFactory: IRepositoryFactory) {
    this.appointmentRepository =
      repositoryFactory.createAppointmentRepository();
  }

  public async execute(data: IListEmployeeMonthAvailability): Promise<
    {
      day: number;
      available: boolean;
    }[]
  > {
    const appointments =
      await this.appointmentRepository.findAllInMonthFromEmployee({
        month: data.month,
        year: data.year,
        employeeId: data.employeeId,
      });

    const arrayDateByDaysOfMonth = Array.from(
      {
        length: DateService.getDaysInMonth({
          month: data.month - 1,
          year: data.year,
        }),
      },
      (_, i) => i + 1
    );

    const availability = arrayDateByDaysOfMonth.map((day) => {
      const compareDate = new Date(data.year, data.month - 1, day, 23, 59, 59);
      const appointmentsInDay = appointments.filter(
        (appointment) => DateService.getDate(appointment.date) === day
      );

      return {
        day,
        available:
          DateService.isAfter({
            date: compareDate,
            dateToCompare: new Date(),
          }) && appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}
