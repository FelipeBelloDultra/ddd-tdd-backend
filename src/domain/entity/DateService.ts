export class DateService {
  static getDaysInMonth({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): number {
    return new Date(year, month, 0).getDate();
  }

  static getDate(date: Date): number {
    return date.getDate();
  }

  static isAfter({
    date,
    dateToCompare,
  }: {
    date: Date;
    dateToCompare: Date;
  }): boolean {
    return date.getTime() > dateToCompare.getTime();
  }
}
