import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useMovieNotifications } from './hooks/useMovieNotifications';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';

function App() {
  useMovieNotifications();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;