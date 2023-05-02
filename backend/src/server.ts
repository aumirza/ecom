import app from "./app";
import { createServer } from "http";

import { PORT } from "./config";
import { db } from "./models";

const server = createServer(app);

db.sync().then(() => {
  console.log("\x1b[32m", "Database is connected");
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`, "\x1b[0m");
  });
});
