import {
    Box,
    Group,
    Overlay,
    Select,
    Stack,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TMDB_IMAGE_BASE_URL } from '../../config/env';
import { useMovieDetailsQuery } from '../../hooks/useMovieDetailsQuery';
import styles from './HomeHeader.module.css';

type GenreOption = {
    value: string;
    label: string;
};

type HomeHeaderProps = {
    genre: string | null;
    genreOptions: GenreOption[];
    onGenreChange: (value: string | null) => void;
    search: string;
    onSearchChange: (value: string) => void;
};

export const HomeHeader = ({
    genre,
    genreOptions,
    onGenreChange,
    search,
    onSearchChange,
}: HomeHeaderProps) => {
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState(search);
    const [debouncedSearch] = useDebouncedValue(localSearch, 500);

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    const randomMovieId = useMemo(() => {
        return String(Math.floor(Math.random() * 500) + 1);
    }, []);

    const { data: randomMovie } = useMovieDetailsQuery(randomMovieId);

    const bgImage = randomMovie?.posterPath
        ? `${TMDB_IMAGE_BASE_URL}${randomMovie.posterPath}`
        : undefined;

    return (
        <Box
            mb="xl"
            className={styles.header}
            style={{
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            }}
        >
            <Overlay
                className={styles.overlay}
                gradient="linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 100%)"
                opacity={1}
                zIndex={1}
            />

            <Group
                justify="space-between"
                align="flex-end"
                className={styles.content}
            >
                <Stack gap="xs" className={styles.left}>
                    <Box
                        onClick={() => navigate(`/movies/${randomMovieId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Title order={1} c="white">
                            {randomMovie?.title || 'Movies'}
                        </Title>

                        <Text c="gray.3" lineClamp={2}>
                            {randomMovie?.synopsis ||
                                'Browse your synced movie library.'}
                        </Text>
                    </Box>

                    <TextInput
                        placeholder="Search movies..."
                        value={localSearch}
                        onChange={(event) => setLocalSearch(event.currentTarget.value)}
                        size="md"
                        radius="md"
                    />
                </Stack>

                <Select
                    placeholder="Filter by genre"
                    data={genreOptions}
                    value={genre}
                    onChange={onGenreChange}
                    clearable
                    className={styles.select}
                />
            </Group>
        </Box>
    );
};