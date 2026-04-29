import {
    Center,
    Container,
    Loader,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { HomeHeader } from '../components/HomeHeader';
import { MovieCard } from '../components/MovieCard';
import { useGenresQuery } from '../hooks/useGenresQuery';
import { useMoviesQuery } from '../hooks/useMoviesQuery';

export const HomePage = () => {
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState<string | null>(null);
    const { ref, inView } = useInView();
    const { data: genres } = useGenresQuery();
    const genreOptions =
        genres?.map((g) => ({
            value: String(g.id),
            label: g.name,
        })) ?? [];

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useMoviesQuery({
        search,
        genre: genre || undefined,
    });

    const movies =
        data?.pages
            .flatMap((page) => page.movies)
        ?? [];

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <Container size="xl">
            <HomeHeader
                genre={genre}
                genreOptions={genreOptions}
                onGenreChange={setGenre}
                search={search}
                onSearchChange={setSearch}
            />

            {isLoading && (
                <Center py="xl">
                    <Loader />
                </Center>
            )}

            {isError && <Text c="red">Failed to load movies.</Text>}

            {!isLoading && movies.length === 0 && (
                <Text c="dimmed">No movies found.</Text>
            )}

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </SimpleGrid>
            <div ref={ref} style={{ height: 80, marginTop: 24 }}>
                {isFetchingNextPage && (
                    <Center>
                        <Loader />
                    </Center>
                )}
            </div>

            {!hasNextPage && movies.length > 0 && (
                <Text ta="center" c="dimmed" mt="md">
                    No more movies.
                </Text>
            )}
        </Container>
    );
};