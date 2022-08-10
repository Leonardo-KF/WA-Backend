import { MoviesValidation } from "@/data/validation/movie-validation";
describe("MovieValidation", () => {
  it("should return a movie if it is valid", async () => {
    const movies = [
      {
        id: "1",
        title: "teste film",
        banner: "teste",
        description: "teste",
        director: "teste",
        producer: "teste",
      },
    ];
    const sut = new MoviesValidation();
    const validation = await sut.validate(movies);
    expect(validation).toStrictEqual(movies);
  });
  it("should throw an error if movie is invalid", async () => {
    const movie = [
      {
        id: "1",
        title: "teste film",
        banner: "teste",
        description: "teste",
        director: undefined,
        producer: "",
      },
    ];
    const sut = new MoviesValidation();
    const validation = sut.validate(movie);
    await expect(validation).rejects.toThrowError("Movie is invalid");
  });
});
