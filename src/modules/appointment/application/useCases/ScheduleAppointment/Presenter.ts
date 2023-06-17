import { IPresenter } from "@core/infra/IPresenter";

import { Appointment } from "@modules/appointment/domain/appointment/Appointment";

type Output = {
  employeeId: string;
  clientId: string;
  date: string;
};

export class Presenter implements IPresenter<Appointment, Output> {
  public toJson(value: Appointment): Output {
    return {
      employeeId: value.employeeId,
      clientId: value.clientId,
      date: value.date.value.toJSON(),
    };
  }
}
