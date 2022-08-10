import { HttpRequest } from "@/data/adapters/http-request";
import { GetMovies } from "@/domain/usecases/get-movies";
import { HttpResponse } from "@/presentation/protocols/httpResponse";
import { IMoviesValidation } from "@/domain/validation/movie-validation";
import { MovieModel } from "@/data/models/movie-model";
import { MoviesValidation } from "@/data/validation/movie-validation";

class GetMoviesUseCase implements GetMovies {
  constructor(
    private readonly httpRequest: HttpRequest,
    private readonly validation: IMoviesValidation
  ) {}
  async getMovies(): Promise<MovieModel[]> {
    const httpResponse = await this.httpRequest.get("any_url");
    const movies = httpResponse.body.map((movie) => {
      const movieAdapt = {
        id: movie.id,
        title: movie.title,
        description: movie.description,
        banner: movie.movie_banner,
        director: movie.director,
        producer: movie.producer,
      };
      return movieAdapt;
    });

    return await this.validation.validate(movies);
  }
}

const MockMovieList = [
  {
    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
    title: "Castle in the Sky",
    movie_banner:
      "https://image.tmdb.org/t/p/w533_and_h300_bestv2/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg",
    description:
      "The orphan Sheeta inherited a mysterious crystal that links her to the mythical sky-kingdom of Laputa. With the help of resourceful Pazu and a rollicking band of sky pirates, she makes her way to the ruins of the once-great civilization. Sheeta and Pazu must outwit the evil Muska, who plans to use Laputa's science to make himself ruler of the world.",
    director: "Hayao Miyazaki",
    producer: "Isao Takahata",
  },
  {
    id: "12cfb892-aac0-4c5b-94af-521852e46d6a",
    title: "Grave of the Fireflies",
    movie_banner:
      "https://image.tmdb.org/t/p/original/vkZSd0Lp8iCVBGpFH9L7LzLusjS.jpg",
    description:
      "In the latter part of World War II, a boy and his sister, orphaned when their mother is killed in the firebombing of Tokyo, are left to survive on their own in what remains of civilian life in Japan. The plot follows this boy and his sister as they do their best to survive in the Japanese countryside, battling hunger, prejudice, and pride in their own quiet, personal battle.",
    director: "Isao Takahata",
    producer: "Toru Hara",
  },
  {
    id: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
    title: "My Neighbor Totoro",
    movie_banner:
      "https://image.tmdb.org/t/p/original/etqr6fOOCXQOgwrQXaKwenTSuzx.jpg",
    description:
      "Two sisters move to the country with their father in order to be closer to their hospitalized mother, and discover the surrounding trees are inhabited by Totoros, magical spirits of the forest. When the youngest runs away from home, the older sister seeks help from the spirits to find her.",
    director: "Hayao Miyazaki",
    producer: "Hayao Miyazaki",
  },
  {
    id: "ea660b10-85c4-4ae3-8a5f-41cea3648e3e",
    title: "Kiki's Delivery Service",
    movie_banner:
      "https://image.tmdb.org/t/p/original/h5pAEVma835u8xoE60kmLVopLct.jpg",
    description:
      "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service.",
    director: "Hayao Miyazaki",
    producer: "Hayao Miyazaki",
  },
  {
    id: "4e236f34-b981-41c3-8c65-f8c9000b94e7",
    title: "Only Yesterday",
    movie_banner:
      "https://image.tmdb.org/t/p/w533_and_h300_bestv2/isCrlWWI4JrdLKAUAwFb5cjAsH4.jpg",
    description:
      "It’s 1982, and Taeko is 27 years old, unmarried, and has lived her whole life in Tokyo. She decides to visit her family in the countryside, and as the train travels through the night, memories flood back of her younger years: the first immature stirrings of romance, the onset of puberty, and the frustrations of math and boys. At the station she is met by young farmer Toshio, and the encounters with him begin to reconnect her to forgotten longings. In lyrical switches between the present and the past, Taeko contemplates the arc of her life, and wonders if she has been true to the dreams of her childhood self.",
    director: "Isao Takahata",
    producer: "Toshio Suzuki",
  },
  {
    id: "ebbb6b7c-945c-41ee-a792-de0e43191bd8",
    title: "Porco Rosso",
    movie_banner:
      "https://image.tmdb.org/t/p/original/nAeCzilMRXvGaxiCpv63ZRVRVgh.jpg",
    description:
      "Porco Rosso, known in Japan as Crimson Pig (Kurenai no Buta) is the sixth animated film by Hayao Miyazaki and released in 1992. You're introduced to an Italian World War I fighter ace, now living as a freelance bounty hunter chasing 'air pirates' in the Adriatic Sea. He has been given a curse that changed his head to that of a pig. Once called Marco Pagot, he is now known to the world as 'Porco Rosso', Italian for 'Red Pig.'",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "1b67aa9a-2e4a-45af-ac98-64d6ad15b16c",
    title: "Pom Poko",
    movie_banner:
      "https://image.tmdb.org/t/p/original/jScPd0u0jeo66l8gwDl7W9hDUnM.jpg",
    description:
      "As the human city development encroaches on the raccoon population's forest and meadow habitat, the raccoons find themselves faced with the very real possibility of extinction. In response, the raccoons engage in a desperate struggle to stop the construction and preserve their home.",
    director: "Isao Takahata",
    producer: "Toshio Suzuki",
  },
  {
    id: "ff24da26-a969-4f0e-ba1e-a122ead6c6e3",
    title: "Whisper of the Heart",
    movie_banner:
      "https://image.tmdb.org/t/p/original/fRtaDgmj0CirvqFUG1XN48BDY1l.jpg",
    description:
      "Shizuku lives a simple life, dominated by her love for stories and writing. One day she notices that all the library books she has have been previously checked out by the same person: 'Seiji Amasawa'. Curious as to who he is, Shizuku meets a boy her age whom she finds infuriating, but discovers to her shock that he is her 'Prince of Books'. As she grows closer to him, she realises that he merely read all those books to bring himself closer to her. The boy Seiji aspires to be a violin maker in Italy, and it is his dreams that make Shizuku realise that she has no clear path for her life. Knowing that her strength lies in writing, she tests her talents by writing a story about Baron, a cat statuette belonging to Seiji's grandfather.",
    director: "Yoshifumi Kondō",
    producer: "Toshio Suzuki",
  },
  {
    id: "0440483e-ca0e-4120-8c50-4c8cd9b965d6",
    title: "Princess Mononoke",
    movie_banner:
      "https://image.tmdb.org/t/p/original/6pTqSq0zYIWCsucJys8q5L92kUY.jpg",
    description:
      "Ashitaka, a prince of the disappearing Ainu tribe, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "45204234-adfd-45cb-a505-a8e7a676b114",
    title: "My Neighbors the Yamadas",
    movie_banner:
      "https://image.tmdb.org/t/p/original/nDOsicEg4RHDq0t23JKGSb58z6u.jpg",
    description:
      "The Yamadas are a typical middle class Japanese family in urban Tokyo and this film shows us a variety of episodes of their lives. With tales that range from the humourous to the heartbreaking, we see this family cope with life's little conflicts, problems and joys in their own way.",
    director: "Isao Takahata",
    producer: "Toshio Suzuki",
  },
  {
    id: "dc2e6bd1-8156-4886-adff-b39e6043af0c",
    title: "Spirited Away",
    movie_banner:
      "https://image.tmdb.org/t/p/original/bSXfU4dwZyBA1vMmXvejdRXBvuF.jpg",
    description:
      "Spirited Away is an Oscar winning Japanese animated film about a ten year old girl who wanders away from her parents along a path that leads to a world ruled by strange and unusual monster-like animals. Her parents have been changed into pigs along with others inside a bathhouse full of these creatures. Will she ever see the world how it once was?",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "90b72513-afd4-4570-84de-a56c312fdf81",
    title: "The Cat Returns",
    movie_banner:
      "https://image.tmdb.org/t/p/original/d4BTZvckFTthyhGX27LZnWxl0tl.jpg",
    description:
      "Haru, a schoolgirl bored by her ordinary routine, saves the life of an unusual cat and suddenly her world is transformed beyond anything she ever imagined. The Cat King rewards her good deed with a flurry of presents, including a very shocking proposal of marriage to his son! Haru embarks on an unexpected journey to the Kingdom of Cats where her eyes are opened to a whole other world.",
    director: "Hiroyuki Morita",
    producer: "Toshio Suzuki",
  },
  {
    id: "cd3d059c-09f4-4ff3-8d63-bc765a5184fa",
    title: "Howl's Moving Castle",
    movie_banner:
      "https://image.tmdb.org/t/p/original/hjlvbMKhQm7N8tYynr8yQ8GBmqe.jpg",
    description:
      "When Sophie, a shy young woman, is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking home.",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "112c1e67-726f-40b1-ac17-6974127bb9b9",
    title: "Tales from Earthsea",
    movie_banner:
      "https://image.tmdb.org/t/p/original/j276noIGGmfi66EnCfewsL2OVTX.jpg",
    description:
      "Something bizarre has come over the land. The kingdom is deteriorating. People are beginning to act strange... What's even more strange is that people are beginning to see dragons, which shouldn't enter the world of humans. Due to all these bizarre events, Ged, a wandering wizard, is investigating the cause. During his journey, he meets Prince Arren, a young distraught teenage boy. While Arren may look like a shy young teen, he has a severe dark side, which grants him strength, hatred, ruthlessness and has no mercy, especially when it comes to protecting Teru. For the witch Kumo this is a perfect opportunity. She can use the boy's 'fears' against the very one who would help him, Ged.",
    director: "Gorō Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "758bf02e-3122-46e0-884e-67cf83df1786",
    title: "Ponyo",
    movie_banner:
      "https://image.tmdb.org/t/p/original/6a1qZ1qat26mAIK3Lq8iYdGpyHm.jpg",
    description:
      "The son of a sailor, 5-year old Sosuke lives a quiet life on an oceanside cliff with his mother Lisa. One fateful day, he finds a beautiful goldfish trapped in a bottle on the beach and upon rescuing her, names her Ponyo. But she is no ordinary goldfish. The daughter of a masterful wizard and a sea goddess, Ponyo uses her father's magic to transform herself into a young girl and quickly falls in love with Sosuke, but the use of such powerful sorcery causes a dangerous imbalance in the world. As the moon steadily draws nearer to the earth and Ponyo's father sends the ocean's mighty waves to find his daughter, the two children embark on an adventure of a lifetime to save the world and fulfill Ponyo's dreams of becoming human.",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "2de9426b-914a-4a06-a3a0-5e6d9d3886f6",
    title: "Arrietty",
    movie_banner:
      "https://image.tmdb.org/t/p/original/7Z7WVzJsSReG8B0CaPk0bvWD7tK.jpg",
    description:
      "14-year-old Arrietty and the rest of the Clock family live in peaceful anonymity as they make their own home from items 'borrowed' from the house's human inhabitants. However, life changes for the Clocks when a human boy discovers Arrietty.",
    director: "Hiromasa Yonebayashi",
    producer: "Toshio Suzuki",
  },
  {
    id: "45db04e4-304a-4933-9823-33f389e8d74d",
    title: "From Up on Poppy Hill",
    movie_banner:
      "https://image.tmdb.org/t/p/original/xtPBZYaWQMQxRpy7mkdk5n1bTxs.jpg",
    description:
      "The story is set in 1963 in Yokohama. Kokuriko Manor sits on a hill overlooking the harbour. A 16 year-old girl, Umi, lives in that house. Every morning she raises a signal flag facing the sea. The flag means “I pray for safe voyages”. A 17 year-old boy, Shun, always sees this flag from the sea as he rides a tugboat to school. Gradually the pair are drawn to each other but they are faced with a sudden trial. Even so, they keep going without running from facing the hardships of reality.",
    director: "Gorō Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "67405111-37a5-438f-81cc-4666af60c800",
    title: "The Wind Rises",
    movie_banner:
      "https://image.tmdb.org/t/p/original/stM3jlD4nSJhlvR2DE7XnB0eN25.jpg",
    description:
      "A lifelong love of flight inspires Japanese aviation engineer Jiro Horikoshi, whose storied career includes the creation of the A-6M World War II fighter plane.",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
  },
  {
    id: "578ae244-7750-4d9f-867b-f3cd3d6fecf4",
    title: "The Tale of the Princess Kaguya",
    movie_banner:
      "https://image.tmdb.org/t/p/original/lMaWlYThCSnsmW3usxWTpSuyZp1.jpg",
    description:
      "A bamboo cutter named Sanuki no Miyatsuko discovers a miniature girl inside a glowing bamboo shoot. Believing her to be a divine presence, he and his wife decide to raise her as their own, calling her 'Princess'.",
    director: "Isao Takahata",
    producer: "Yoshiaki Nishimura",
  },
  {
    id: "5fdfb320-2a02-49a7-94ff-5ca418cae602",
    title: "When Marnie Was There",
    movie_banner:
      "https://image.tmdb.org/t/p/original/axUX7urQDwCGQ9qbgh2Yys7qY9J.jpg",
    description:
      "The film follows Anna Sasaki living with her relatives in the seaside town. Anna comes across a nearby abandoned mansion, where she meets Marnie, a mysterious girl who asks her to promise to keep their secrets from everyone. As the summer progresses, Anna spends more time with Marnie, and eventually Anna learns the truth about her family and foster care.",
    director: "Hiromasa Yonebayashi",
    producer: "Yoshiaki Nishimura",
  },
  {
    id: "d868e6ec-c44a-405b-8fa6-f7f0f8cfb500",
    title: "The Red Turtle",
    movie_banner:
      "https://image.tmdb.org/t/p/original/kjXdW5H3myRBmTMYgKayjphr2FA.jpg",
    description:
      "A man set adrift by a storm wakes up on a beach. He discovers that he is on a deserted island with plenty of fresh water, fruit and a dense bamboo forest. He builds a raft from bamboo and attempts to sail away, but his raft is destroyed by an unseen monster in the sea, forcing him back to the island. He tries again with another, larger raft, but is again foiled by the creature. A third attempt again ends with the raft destroyed, but this time he is confronted by a giant red turtle, which stares at him, and forces him back to the island.",
    director: "Michaël Dudok de Wit",
    producer:
      "Toshio Suzuki, Isao Takahata, Vincent Maraval, Pascal Caucheteux, Grégoire Sorlat",
  },
  {
    id: "790e0028-a31c-4626-a694-86b7a8cada40",
    title: "Earwig and the Witch",
    movie_banner:
      "https://www.themoviedb.org/t/p/original/qMxpGzmmnY1jLd4p7EhhoW43wWF.jpg",
    description:
      "An orphan girl, Earwig, is adopted by a witch and comes home to a spooky house filled with mystery and magic.",
    director: "Gorō Miyazaki",
    producer: "Toshio Suzuki",
  },
];

class HttpRequestAdapter implements HttpRequest {
  async get(url: string): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: MockMovieList,
    };
  }
}

describe("getMoviesUseCase", () => {
  it("should return a movie list", async () => {
    const request = new HttpRequestAdapter();
    const validation = new MoviesValidation();
    const getMoviesUseCase = new GetMoviesUseCase(request, validation);

    const movies = await getMoviesUseCase.getMovies();

    expect(movies).toBeTruthy();
  });
});
