'use client';

import React, { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '@/app/_actions/movies';

// store
import { useMovieStore } from '@/store';

// components
import MovieCard from './MovieCard';

export default function Movies() {
  const { searchTerm } = useMovieStore();

  const { data, error } = useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (error) {
    throw new Error('Error fetching movie data');
  }

  const filteredMovies = useMemo(() => {
    if (!data || !data.results) return [];

    return data.results.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <div className=''>
      {filteredMovies && filteredMovies.length === 0 && (
        <div className='mt-24 text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>No movies found.</h1>
          <p className='mt-4 text-xl text-gray-600'>
            Try adjusting your search query or explore some of our favorites.
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
