import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../api/genres.api';
import type { Genre } from '../types/movie.types';

export const useGenresQuery = () => {
    return useQuery<Genre[], Error>({
        queryKey: ['genres'],
        queryFn: getGenres,
    });
};