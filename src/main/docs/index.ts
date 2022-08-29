import paths from "./pahts";
import schemas from "./schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "Movies API",
    description: "Documentation for the movies API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3333/movies",
      description: "Local server",
    },
    {
      url: "https://wa-backend-production.up.railway.app/movies",
      description: "Production server",
    },
  ],
  paths,
  schemas,
};
