import { IPresenter } from "@core/infra/IPresenter";

import { Client } from "@modules/client/domain/client/Client";

type Output = {
  id: string;
  name: string;
  email: string;
};

export class Presenter implements IPresenter<Client, Output> {
  public toJson(value: Client): Output {
    return {
      id: value.id,
      name: value.name.value,
      email: value.email.value,
    };
  }
}
