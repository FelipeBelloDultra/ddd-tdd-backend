import { DateService } from "@core/domain/entity/DateService";
import { Appointment } from "./Appointment";

interface ICheckMonth {
  month: number;
  year: number;
}

interface ICheckDay {
  month: number;
  year: number;
  day: number;
}

export class AppointmentAvailability {
  private readonly appointments: Appointment[];
  private readonly START_HOUR = 8;
  private readonly MAX_APPOINTMENTS_PER_DAY = 10;

  constructor(appointments: Appointment[] = []) {
    this.appointments = appointments;
  }

  private generateArray(length: number, startsAt = 1): Array<number> {
    return Array.from(
      {
        length,
      },
      (_, i) => i + startsAt
    );
  }

  public checkMonth({ month, year }: ICheckMonth): {
    day: number;
    available: boolean;
  }[] {
    const arrayDateByDaysOfMonth = this.generateArray(
      DateService.getDaysInMonth({
        month: month - 1,
        year: year,
      })
    );

    const availability = arrayDateByDaysOfMonth.map((day) => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);
      const appointmentsInDay = this.appointments.filter(
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

  public checkDay({ day, month, year }: ICheckDay): {
    hour: number;
    available: boolean;
  }[] {
    const eachHourArray = this.generateArray(
      this.MAX_APPOINTMENTS_PER_DAY,
      this.START_HOUR
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = this.appointments.some(
        (appointment) => new Date(appointment.date).getHours() === hour
      );

      const compareDate = new Date(year, month - 1, day, hour);

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
