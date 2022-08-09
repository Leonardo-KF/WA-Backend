import { setupRoutes } from "./routes";

import express from "express";

const app = express();
setupRoutes(app);
export default app;
