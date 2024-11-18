import Link from 'next/link';

// components
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// store
import { useMovieStore, Movie } from '@/store';

import { toast } from '../hooks/use-toast';
import { format } from 'date-fns';

export default function MovieCard({ movie }: any) {
  const { id, title, poster_path, release_date, overview, vote_average } =
    movie;

  const { favoriteMovies, addMovieToFavorites, removeMovieFromFavorites } =
    useMovieStore();

  const isFavorite = favoriteMovies.find((movie) => movie.id === id);

  function handleFavoriteClick(movie: Movie) {
    if (isFavorite) {
      removeMovieFromFavorites(movie.id);
    } else {
      addMovieToFavorites(movie);
    }

    toast({
      title: 'Success',
      description: `${movie.title} ${
        isFavorite ? 'removed from' : 'added to'
      } favorites`,
    });
  }

  return (
    <div>
      <Card className='h-full flex flex-col overflow-hidden shadow-lg rounded-lg bg-white'>
        {/* Movie Poster */}
        <div className='relative h-64'>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${poster_path}`}
            alt={title}
            className='w-full h-full object-cover'
          />
          <div className='absolute top-2 left-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded'>
            {vote_average.toFixed(1)}
          </div>
        </div>

        {/* Card Content */}
        <CardContent className='px-6'>
          <CardTitle className='my-6 text-lg font-bold truncate'>
            {title}
          </CardTitle>
          <p className='text-sm text-gray-600 line-clamp-2 mt-2'>{overview}</p>
          <p className='text-sm text-gray-500 mt-4'>
            Release Date: {format(release_date, 'PPPP')}
          </p>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className='p-4 flex justify-between items-center flex-col gap-3 lg:flex-row lg:gap-3'>
          <Link className='w-full' href={`/movie/${id}`}>
            <Button
              variant={'ghost'}
              className='bg-foreground text-muted text-sm font-semibold py-1 px-4 rounded hover:bg-muted-foreground hover:text-muted-background w-full lg:w-fit'
            >
              View Details
            </Button>
          </Link>

          <Button
            onClick={() => handleFavoriteClick(movie)}
            variant={'outline'}
            className='bg-muted text-foreground text-sm font-semibold py-1 px-4 rounded hover:bg-muted-foreground hover:text-muted-background w-full'
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
