import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '../api/movies.api';
import type { Movie } from '../types/movie.types';

export const useMovieDetailsQuery = (id?: string) => {
    return useQuery<Movie, Error>({
        queryKey: ['movie', id],
        queryFn: () => getMovieById(id!),
        enabled: Boolean(id),
    });
};