import "module-alias/register";
import { env } from "./config/env";
import { MongoHelper } from "@/infra/helpers/mongo-helper";
import { setupApp } from "./config/app";

MongoHelper.connect(env.mongoUrl).then(() => {
  console.log("database connected");
  const app = setupApp();
  app.listen(env.port, () => {
    console.log("Server running at: http://localhost:" + env.port);
  });
});
