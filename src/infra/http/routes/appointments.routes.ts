import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";
import { adaptMiddleware } from "@core/infra/adapters/expressMiddlewareAdapter";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { makeScheduleAppointmentControllerFactory } from "../factories/controller/ScheduleAppointmentControllerFactory";

import { makeEnsureAuthenticatedMiddlewareFactory } from "../factories/middlewares/makeEnsureAuthenticatedMiddlewareFactory";

const appointmentsRouter = Router();

appointmentsRouter.post(
  "/",
  adaptMiddleware(
    makeEnsureAuthenticatedMiddlewareFactory([IPermissions.CLIENT])
  ),
  adaptRoute(makeScheduleAppointmentControllerFactory())
);

export { appointmentsRouter };
