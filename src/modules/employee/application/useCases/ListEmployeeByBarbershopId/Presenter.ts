import { IPresenter } from "@core/infra/IPresenter";

import { Employee } from "@modules/employee/domain/employee/Employee";

type Output = Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  barbershopId: string;
}>;

export class Presenter implements IPresenter<Employee[], Output> {
  public toJson(value: Employee[]): Output {
    const toPresent = value.map((employee) => ({
      id: employee.id,
      name: employee.name.value,
      email: employee.email.value,
      phone: employee.phone.value,
      barbershopId: employee.barbershopId,
      avatarUrl: employee.avatarUrl.value,
    }));

    return toPresent;
  }
}
