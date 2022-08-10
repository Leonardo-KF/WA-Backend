export const updateMoviesPath = {
  get: {
    summary: "Update movies saved in the database",
    description: "This route return the movies",
    tags: ["Movies"],
    responses: {
      400: {
        description: "Bad Request caused by invalid movie sended of API",
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
