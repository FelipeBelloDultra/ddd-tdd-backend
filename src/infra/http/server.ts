import { app } from "./app";
import serverConfig from "@config/server";

app.listen(serverConfig.port, () => {
  console.log("server listening");
});
