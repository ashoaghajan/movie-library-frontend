import { Badge, Card, Group, Image, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../../config/env';
import type { Movie } from '../../types/movie.types';
import styles from './MovieCard.module.css';

type MovieCardProps = {
    movie: Movie;
};

export const MovieCard = ({ movie }: MovieCardProps) => {
    const navigate = useNavigate();

    const posterUrl = movie.posterPath
        ? `${TMDB_IMAGE_BASE_URL}${movie.posterPath}`
        : null;

    const releaseYear = movie.releaseDate
        ? new Date(movie.releaseDate).getFullYear()
        : null;

    const runtime = movie.runtime
        ? `${movie.runtime} min`
        : null;

    return (
        <Card
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            onClick={() => navigate(`/movies/${movie.id}`)}
            className={styles.card}
        >
            <Card.Section>
                <Image
                    src={posterUrl}
                    style={{
                        aspectRatio: '2 / 3',
                        width: '100%',
                    }}
                    alt={movie.title}
                    fallbackSrc="https://placehold.co/500x750?text=No+Poster"
                    className={styles.image}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={700} lineClamp={1}>
                    {movie.title}
                </Text>

                {movie.rating !== null && (
                    <Badge color="yellow" variant="light">
                        {movie.rating.toFixed(1)}
                    </Badge>
                )}
            </Group>

            {/* NEW: release date + runtime */}
            <Text size="xs" c="dimmed" mb="xs">
                {[releaseYear, runtime].filter(Boolean).join(' • ')}
            </Text>

            <Text size="sm" c="dimmed" lineClamp={3}>
                {movie.synopsis || 'No synopsis available.'}
            </Text>

            <Group gap="xs" mt="md">
                {movie.genres?.slice(0, 3).map((item) => (
                    <Badge key={item.genreId} variant="outline">
                        {item.genre.name}
                    </Badge>
                ))}
            </Group>
        </Card>
    );
};