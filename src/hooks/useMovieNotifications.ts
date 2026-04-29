import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';
import { API_BASE_URL } from '../config/env';

export const useMovieNotifications = () => {
    useEffect(() => {
        const eventSource = new EventSource(`${API_BASE_URL}/sse/movies`);

        eventSource.addEventListener('movies-added', (event) => {
            const data = JSON.parse(event.data);

            showNotification({
                title: 'New Movies',
                message: `${data.insertedMoviesCount} new movies added`,
            });
        });

        return () => {
            eventSource.close();
        };
    }, []);
};