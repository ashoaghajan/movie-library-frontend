export type Genre = {
    id: number;
    tmdbId: number;
    name: string;
};

export type Person = {
    id: number;
    tmdbId: number;
    name: string;
    profilePath: string | null;
};

export type MovieGenre = {
    movieId: number;
    genreId: number;
    genre: Genre;
};

export type MovieCast = {
    movieId: number;
    personId: number;
    characterName: string;
    person: Person;
};

export type MovieDirector = {
    movieId: number;
    personId: number;
    person: Person;
};

export type Movie = {
    id: number;
    tmdbId: number;
    title: string;
    releaseDate: string | null;
    runtime: number | null;
    synopsis: string | null;
    rating: number | null;
    posterPath: string | null;
    createdAt: string;
    updatedAt: string;

    genres: MovieGenre[];
    cast: MovieCast[];
    directors: MovieDirector[];
};

export type MoviesResponse = {
    movies: Movie[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type MoviesApiResponse = {
    data: MoviesResponse;
};

export type MovieDetailsResponse = {
    data: Movie;
};

export type GenresResponse = {
    data: Genre[];
};
