import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";

import { makeCreateContactControllerFactory } from "../factories/controller/CreateClientControllerFactory";
import { makeAuthenticateClientControllerFactory } from "../factories/controller/AuthenticateClientControllerFactory";
import { makeShowAuthenticatedClientControllerFactory } from "../factories/controller/ShowAuthenticatedClientControllerFactory";

const clientsRouter = Router();

clientsRouter.post("/", adaptRoute(makeCreateContactControllerFactory()));
clientsRouter.post(
  "/session",
  adaptRoute(makeAuthenticateClientControllerFactory())
);
clientsRouter.post(
  "/session/me",
  adaptRoute(makeShowAuthenticatedClientControllerFactory())
);

export { clientsRouter };
