import setupMiddlewares from "@/main/config/midlewares";
import { setupRoutes } from "./routes";
import setupSwagger from "./swagger";

import express from "express";

const app = express();
setupSwagger(app);
setupMiddlewares(app);
setupRoutes(app);
export default app;
