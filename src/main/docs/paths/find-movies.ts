export const findMoviePath = {
  get: {
    summary: "Find 10 movies per page",
    description: "This route return the movies saved in the database",
    tags: ["Movies"],
    parameters: [
      {
        in: "path",
        name: "id",
        description: "Movies page number",
        required: true,
        schema: {
          type: "string",
        },
      },
    ],
    responses: {
      400: {
        description: "Bad Request",
      },
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/schemas/movie",
              },
            },
          },
        },
      },
    },
  },
};
