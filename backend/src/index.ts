import app from "./app.js";
import { logger } from "./lib/logger.js";

const port = Number(process.env.PORT) || 5000;

app.listen(port, "0.0.0.0", () => {
  logger.info({ port }, "MahiCV.AI API server listening");
});
