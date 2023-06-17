import { Router } from "express";

import { clientsRouter } from "./clients.routes";
import { appointmentsRouter } from "./appointments.routes";
import { employeesRouter } from "./employees.routes";
import { barbershopsRouter } from "./barbershops.routes";

const router = Router();

router.use("/clients", clientsRouter);
router.use("/appointments", appointmentsRouter);
router.use("/employees", employeesRouter);
router.use("/barbershops", barbershopsRouter);

export { router };
