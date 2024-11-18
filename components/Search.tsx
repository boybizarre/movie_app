'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

// store
import { useMovieStore, Movie } from '@/store';

// utils
import { useDebounce } from '@/hooks/useDebounce';

function Search() {

  const { setSearchTerm } =
    useMovieStore();
  const [value, setValue] = useState('');

  const debouncedValue = useDebounce(value, 500);

  // dispatch search action when the debounced value changes
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className='flex items-center justify-center h-full'>
      <Input
        type='text'
        placeholder='Search for a movie'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='bg-background focus-visible:ring-offset-0 rounded-lg w-full h-12 px-4'
      />
    </div>
  );
}

export default Search;
