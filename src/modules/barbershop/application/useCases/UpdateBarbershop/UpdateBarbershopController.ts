import { IController } from "@core/infra/IController";
import { HttpResponse } from "@core/infra/HttpResponse";

import { UpdateBarbershop } from "./UpdateBarbershop";
import { Presenter } from "./Presenter";

export interface IUpdateBarbershopControllerRequest {
  authenticatedId: string;
  authenticatedEmail: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  phone?: string;
  avatarUrl?: string;
}

type IHandleInput = IController<IUpdateBarbershopControllerRequest>;

export class UpdateBarbershopController implements IHandleInput {
  constructor(private readonly updateBarbershop: UpdateBarbershop) {}

  public async handle(request: IUpdateBarbershopControllerRequest) {
    try {
      const result = await this.updateBarbershop.execute({
        id: request.authenticatedId,
        email: request.authenticatedEmail,
        street: request.street,
        neighborhood: request.neighborhood,
        number: request.number,
        phone: request.phone,
        avatarUrl: request.avatarUrl,
      });

      if (result.isLeft()) {
        return HttpResponse.clientError(result.value);
      }

      const toPresent = new Presenter().toJson(result.value);

      return HttpResponse.ok(toPresent);
    } catch (error) {
      return HttpResponse.fail(error as Error);
    }
  }
}
