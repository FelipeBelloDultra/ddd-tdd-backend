import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";
import { adaptMiddleware } from "@core/infra/adapters/expressMiddlewareAdapter";

import { makeCreateContactControllerFactory } from "../factories/controller/CreateClientControllerFactory";
import { makeAuthenticateClientControllerFactory } from "../factories/controller/AuthenticateClientControllerFactory";
import { makeShowAuthenticatedClientControllerFactory } from "../factories/controller/ShowAuthenticatedClientControllerFactory";

import { makeEnsureAuthenticatedMiddlewareFactory } from "../factories/middlewares/makeEnsureAuthenticatedMiddlewareFactory";

const clientsRouter = Router();

clientsRouter.post("/", adaptRoute(makeCreateContactControllerFactory()));
clientsRouter.post(
  "/session",
  adaptRoute(makeAuthenticateClientControllerFactory())
);
clientsRouter.post(
  "/session/me",
  adaptMiddleware(makeEnsureAuthenticatedMiddlewareFactory(["client"])),
  adaptRoute(makeShowAuthenticatedClientControllerFactory())
);

export { clientsRouter };
