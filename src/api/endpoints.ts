export const endpoints = {
    movies: {
        list: '/movies',
        details: (id: string | number) => `/movies/${id}`,
    },
    genres: {
        list: '/genres',
    },
    sse: {
        movies: '/sse/movies',
    },
};