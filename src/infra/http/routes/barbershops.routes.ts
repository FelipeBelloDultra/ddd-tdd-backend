import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";
import { adaptMiddleware } from "@core/infra/adapters/expressMiddlewareAdapter";
import { IPermissions } from "@core/domain/AvailablePermissions";

import { makeCreateBarbershopController } from "../factories/controller/CreateBarbershopControllerFactory";
import { makeAuthenticateBarbershopControllerFactory } from "../factories/controller/AuthenticateBarbershopControllerFactory";
import { makeShowAuthenticatedBarbershopControllerFactory } from "../factories/controller/ShowAuthenticatedBarbershopControllerFactory";
import { makeUpdateBarbershopControllerFactory } from "../factories/controller/UpdateBarbershopControllerFactory";

import { makeEnsureAuthenticatedMiddlewareFactory } from "../factories/middlewares/makeEnsureAuthenticatedMiddlewareFactory";

const barbershopsRouter = Router();

barbershopsRouter.post("/", adaptRoute(makeCreateBarbershopController()));
barbershopsRouter.put(
  "/",
  adaptMiddleware(
    makeEnsureAuthenticatedMiddlewareFactory([IPermissions.BARBERSHOP])
  ),
  adaptRoute(makeUpdateBarbershopControllerFactory())
);
barbershopsRouter.post(
  "/session",
  adaptRoute(makeAuthenticateBarbershopControllerFactory())
);
barbershopsRouter.post(
  "/session/me",
  adaptMiddleware(
    makeEnsureAuthenticatedMiddlewareFactory([IPermissions.BARBERSHOP])
  ),
  adaptRoute(makeShowAuthenticatedBarbershopControllerFactory())
);

export { barbershopsRouter };
