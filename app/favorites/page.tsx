'use client';

import React, { useMemo } from 'react';
import { useMovieStore, Movie } from '@/store';

// components
import MovieCard from '@/components/MovieCard';

export default function Movies() {

  const { favoriteMovies, searchTerm } = useMovieStore();

  const filteredMovies = useMemo(() => {
    if (!favoriteMovies || !favoriteMovies) return [];
    
    return favoriteMovies.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
  }, [favoriteMovies, searchTerm]);

  return (
    <div className=''>
      {filteredMovies && filteredMovies.length === 0 && (
          <div className='mt-24 text-center'>
            <h1 className='text-3xl font-bold text-gray-800'>
              No movies found.
            </h1>
            <p className='mt-4 text-xl text-gray-600'>
              You have not added any movie to your favorites yet. Start by
              searching for a movie and clicking the "Add to Favorites" button
            </p>
          </div>
        )}
      <div className='container mx-auto grid grid-cols-1 gap-6 min-h-24 px-12 py-6 rounded-3xl sm:grid-cols-2 lg:grid-cols-3'>
        {filteredMovies &&
          filteredMovies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}
