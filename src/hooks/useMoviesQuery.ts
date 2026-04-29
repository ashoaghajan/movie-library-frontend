import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../api/movies.api';
import type { MoviesResponse } from '../types/movie.types';

type UseMoviesQueryParams = {
    search?: string;
    genre?: string;
};

export const useMoviesQuery = ({ search, genre }: UseMoviesQueryParams) => {
    return useInfiniteQuery<MoviesResponse, Error>({
        queryKey: ['movies', search, genre],
        queryFn: ({ pageParam = 1 }) =>
            getMovies({
                page: Number(pageParam),
                search,
                genre,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.page < lastPage.meta.totalPages
                ? lastPage.meta.page + 1
                : undefined;
        },
    });
};