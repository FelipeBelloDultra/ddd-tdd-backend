import { Jwt } from "@core/domain/Jwt";
import { IPresenter } from "@core/infra/IPresenter";

type Output = {
  token: string;
};

export class Presenter implements IPresenter<Jwt, Output> {
  public toJson(value: Jwt): Output {
    return {
      token: value.token,
    };
  }
}
