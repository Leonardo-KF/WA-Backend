export const movieSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    banner: { type: "string" },

    description: { type: "string" },
    director: { type: "string" },
    producer: { type: "string" },
  },
};
