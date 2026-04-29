const getEnv = (key: string, value: string | undefined) => {
    if (!value) {
        throw new Error(`Missing env variable: ${key}`);
    }
    return value;
};

export const TMDB_IMAGE_BASE_URL = getEnv(
    'VITE_TMDB_IMAGE_BASE_URL',
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL
);

export const API_BASE_URL = getEnv(
    'VITE_API_BASE_URL',
    import.meta.env.VITE_API_BASE_URL
);