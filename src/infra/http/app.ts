import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.use("/api/v1", router);

export { app };
