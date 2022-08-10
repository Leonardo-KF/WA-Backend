import setupMiddlewares from "@/main/config/midlewares";
import { setupRoutes } from "./routes";

import express from "express";

const app = express();
setupMiddlewares(app);
setupRoutes(app);
export default app;
