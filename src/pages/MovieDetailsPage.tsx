import {
    Button,
    Container,
    Image,
    Loader,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDetailsHeader } from '../components/MovieDetailsHeader';
import { MovieDetailsPeopleSection } from '../components/MovieDetailsPeopleSection';
import { TMDB_IMAGE_BASE_URL } from '../config/env';
import { useMovieDetailsQuery } from '../hooks/useMovieDetailsQuery';

export const MovieDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: movie, isLoading, isError } = useMovieDetailsQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !movie) {
        return <Text c="red">Failed to load movie details.</Text>;
    }

    const posterUrl = movie.posterPath
        ? `${TMDB_IMAGE_BASE_URL}${movie.posterPath}`
        : 'https://placehold.co/500x750?text=No+Poster';

    return (
        <Container size="lg">
            <Button variant="subtle" mb="md" onClick={() => navigate(-1)}>
                Back
            </Button>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <Image
                    src={posterUrl}
                    alt={movie.title}
                    radius="md"
                    h={600}
                    fit="contain"
                />

                <Stack>
                    <MovieDetailsHeader movie={movie} />

                    <MovieDetailsPeopleSection
                        title="Directors"
                        people={movie.directors}
                        emptyText="No directors available."
                    />

                    <MovieDetailsPeopleSection
                        title="Cast"
                        people={movie.cast}
                        emptyText="No cast available."
                        showCharacterName
                    />
                </Stack>
            </SimpleGrid>
        </Container>
    );
};