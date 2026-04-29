import type {
    Movie,
    MovieDetailsResponse,
    MoviesApiResponse,
    MoviesResponse,
} from '../types/movie.types';
import { api } from './axios';
import { endpoints } from './endpoints';

export type GetMoviesParams = {
    page?: number;
    search?: string;
    genre?: string;
};

export const getMovies = async (
    params: GetMoviesParams
): Promise<MoviesResponse> => {
    const response = await api.get<MoviesApiResponse>(endpoints.movies.list, {
        params,
    });

    return response.data.data;
};

export const getMovieById = async (id: string): Promise<Movie> => {
    const response = await api.get<MovieDetailsResponse>(
        endpoints.movies.details(id)
    );

    return response.data.data;
};