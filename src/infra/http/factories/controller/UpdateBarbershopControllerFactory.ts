import { IController } from "@core/infra/IController";

import { PrismaRepositoryFactory } from "@infra/database/factories/prisma/PrismaRepositoryFactory";

import { UpdateBarbershop } from "@modules/barbershop/application/useCases/UpdateBarbershop/UpdateBarbershop";
import {
  IUpdateBarbershopControllerRequest,
  UpdateBarbershopController,
} from "@modules/barbershop/application/useCases/UpdateBarbershop/UpdateBarbershopController";

export function makeUpdateBarbershopControllerFactory(): IController<IUpdateBarbershopControllerRequest> {
  const prismaRepositoryFactory = PrismaRepositoryFactory.create();
  const updateBarbershop = new UpdateBarbershop({
    updateBarbershopRepository: prismaRepositoryFactory.barbershopRepository,
  });
  const updateBarbershopController = new UpdateBarbershopController(
    updateBarbershop
  );

  return updateBarbershopController;
}
