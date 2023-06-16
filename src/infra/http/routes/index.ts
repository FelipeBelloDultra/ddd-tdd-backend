import { Router } from "express";

import { clientsRouter } from "./clients.routes";
import { appointmentsRouter } from "./appointments.routes";

const router = Router();

router.use("/clients", clientsRouter);
router.use("/appointments", appointmentsRouter);

export { router };
