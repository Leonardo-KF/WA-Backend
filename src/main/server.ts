import "module-alias/register";
import app from "./config/app";
import { env } from "./config/env";
import { MongoHelper } from "@/infra/helpers/mongo-helper";

MongoHelper.connect(env.mongoUrl).then(() => {
  console.log("database connected");
  app.listen(env.port, () => {
    console.log("Server running at: http://localhost:" + env.port);
  });
});
