import { IPresenter } from "@core/infra/IPresenter";

import { Barbershop } from "@modules/barbershop/domain/barbershop/Barbershop";

type Output = {
  id: string;
  name: string;
  email: string;
  street: string | null;
  neighborhood: string | null;
  number: string | null;
  phone: string | null;
  avatarUrl: string | null;
};

export class Presenter implements IPresenter<Barbershop, Output> {
  public toJson(value: Barbershop): Output {
    return {
      id: value.id,
      name: value.name.value,
      email: value.email.value,
      street: value.street ? value.street.value : null,
      neighborhood: value.neighborhood ? value.neighborhood.value : null,
      number: value.number ? value.number.value : null,
      phone: value.phone ? value.phone.value : null,
      avatarUrl: value.avatarUrl ? value.avatarUrl.value : null,
    };
  }
}
