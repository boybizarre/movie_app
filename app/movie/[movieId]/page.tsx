'use client';

import { useState, use, Suspense } from 'react';

import MovieCard from '@/components/MovieCard';
import SkeletonWrapper from '@/components/SkeletonWrapper';

import { useQuery } from '@tanstack/react-query';

import { fetchMovieById } from '@/app/_actions/movies';

type Props = {
  params: {
    movieId: string;
  };
};

export default function MovieDetails({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = use(params);

  console.log('movieId: ', movieId);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', movieId],
    queryFn: () => fetchMovieById(+movieId),
  });

  // console.log('single_movie: ', data);

  // Handle loading state
  if (isLoading) {
    // <Suspense
    //   fallback={
    //     <SkeletonWrapper isLoading={true}>
    //       <MovieCard loading={true} />
    //     </SkeletonWrapper>
    //   }
    // >
    //   <MovieCard movie={data} />
    // </Suspense>;
    return <p>Loading movie details...</p>;
  }

  // Handle error state
  if (error) {
    throw new Error('Error fetching movie data. Please try again later');
  }

  // Check if data exists
  if (!data) {
    return <p>No movie data found.</p>;
  }

  const genres = data.genres
    .map((genre: any) => {
      return genre.name;
    })
    .join(', ');

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
      <div className='w-11/12 max-w-3xl rounded-lg bg-gray-800 shadow-lg overflow-hidden flex flex-col md:flex-row'>
        {/* Poster Section */}
        <div className='md:w-1/3'>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${data.poster_path}`}
            alt={`${data.original_title} poster`}
            className='w-full h-auto object-cover'
          />
        </div>

        {/* Details Section */}
        <div className='flex flex-col justify-between p-6 md:w-2/3'>
          {/* Title */}
          <h1 className='text-3xl font-bold mb-4'>{data.title}</h1>

          {/* Genres */}
          <p className='text-sm text-gray-400 mb-4'>
            <span className='font-semibold'>Genres:</span> {genres}
          </p>

          {/* Overview */}
          <p className='text-gray-300 mb-6 leading-relaxed'>{data.overview}</p>

          {/* Footer */}
          <div className='mt-auto'>
            <p className='text-sm text-gray-500'>
              © { new Date().getFullYear() } My Movie App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
