import { Router } from "express";

import { adaptRoute } from "@core/infra/adapters/expressRouteAdapter";

import { makeCreateContactControllerFactory } from "../factories/controller/CreateClientControllerFactory";

const clientsRouter = Router();

clientsRouter.post("/", adaptRoute(makeCreateContactControllerFactory()));

export { clientsRouter };
