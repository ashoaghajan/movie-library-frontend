import type { Genre, GenresResponse } from '../types/movie.types';
import { api } from './axios';
import { endpoints } from './endpoints';

export const getGenres = async (): Promise<Genre[]> => {
    const response = await api.get<GenresResponse>(endpoints.genres.list);
    return response.data.data;
};