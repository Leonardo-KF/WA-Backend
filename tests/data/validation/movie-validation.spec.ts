import { MovieValidation } from "@/data/validation/movie-validation";
describe("MovieValidation", () => {
  it("should return a movie if it is valid", async () => {
    const movie = {
      id: "1",
      title: "teste film",
      banner: "teste",
      description: "teste",
      director: "teste",
      producer: "teste",
    };
    const sut = new MovieValidation();
    const validation = await sut.validate(movie);
    expect(validation).toBe(movie);
  });
  it("should throw an error if movie is invalid", async () => {
    const movie = {
      id: "1",
      title: "teste film",
      banner: "teste",
      description: "teste",
      director: undefined,
      producer: "",
    };
    const sut = new MovieValidation();
    const validation = sut.validate(movie);
    await expect(validation).rejects.toThrowError("Movie is invalid");
  });
});
