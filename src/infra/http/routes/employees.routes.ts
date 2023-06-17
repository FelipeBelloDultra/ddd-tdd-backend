import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";
import { adaptMiddleware } from "@core/infra/adapters/expressMiddlewareAdapter";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { makeCreateEmployeeControllerFactory } from "../factories/controller/CreateEmployeeControllerFactory";

import { makeEnsureAuthenticatedMiddlewareFactory } from "../factories/middlewares/makeEnsureAuthenticatedMiddlewareFactory";
import { makeListEmployeeByBarbershopIdControllerFactory } from "../factories/controller/ListEmployeeByBarbershopIdControllerFactory";

const employeesRouter = Router();

employeesRouter.post(
  "/",
  adaptMiddleware(
    makeEnsureAuthenticatedMiddlewareFactory([IPermissions.BARBERSHOP])
  ),
  adaptRoute(makeCreateEmployeeControllerFactory())
);
employeesRouter.get(
  "/:barbershopId",
  adaptRoute(makeListEmployeeByBarbershopIdControllerFactory())
);

export { employeesRouter };
