import { Badge, Group, Stack, Text, Title } from '@mantine/core';
import type { Movie } from '../../types/movie.types';

type Props = {
    movie: Movie;
};

export const MovieDetailsHeader = ({ movie }: Props) => {
    return (
        <Stack gap="xs">
            <Title order={1}>{movie.title}</Title>

            <Group>
                {movie.rating !== null && (
                    <Badge color="yellow" size="lg">
                        Rating {movie.rating.toFixed(1)}
                    </Badge>
                )}

                {movie.runtime && (
                    <Badge variant="light" size="lg">
                        {movie.runtime} min
                    </Badge>
                )}

                {movie.releaseDate && (
                    <Badge variant="outline" size="lg">
                        {new Date(movie.releaseDate).toLocaleDateString()}
                    </Badge>
                )}
            </Group>

            <Group gap="xs">
                {movie.genres?.map((item) => (
                    <Badge key={item.genreId} variant="outline">
                        {item.genre.name}
                    </Badge>
                ))}
            </Group>

            <Text size="md" lh={1.7}>
                {movie.synopsis || 'No synopsis available.'}
            </Text>
        </Stack>
    );
};