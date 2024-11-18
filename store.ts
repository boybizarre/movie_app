import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type MovieContextType = {
  searchTerm: string;
  favoriteMovies: any[];
  setSearchTerm: (searchTerm: string) => void;
  addMovieToFavorites: (movie: Movie) => void;
  removeMovieFromFavorites: (movieId: number) => void;
};

export const useMovieStore = create<MovieContextType>()(
  persist(
    (set, get) => ({
      searchTerm: '',
      favoriteMovies: [],
      setSearchTerm: (searchTerm: string) => set({ searchTerm }),
      addMovieToFavorites: (movie: Movie) =>
        set({ favoriteMovies: [...get().favoriteMovies, movie] }),
      removeMovieFromFavorites: (movieId: number) =>
        set({
          favoriteMovies: get().favoriteMovies.filter(
            (movie) => movie.id !== movieId
          ),
        }),
    }),
    {
      name: 'movie-storage',
      // partialize: (state) => ({
      //   favoriteMovies: state.favoriteMovies,
      // }),
    }
  )
);
