import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Search from '@/components/Search';

function Navbar() {
  return (
    <div className='bg-background'>
      <div className='container mx-auto'>
        {/* Main Navbar */}
        <nav className='flex flex-wrap items-center justify-between h-24 px-6'>
          {/* Left Text */}
          <Link href='/'>
            <p className='text-xl bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text font-bold leading-tighter text-transparent md:text-3xl'>
              My Movie App
            </p>
          </Link>

          {/* Search Bar - Visible on large screens */}
          <div className='hidden lg:block w-1/2'>
            <Search />
          </div>

          {/* Right Button */}
          <Link href='/favorites'>
            <Button variant='outline' className='cursor-pointer'>
              Manage Favorites
            </Button>
          </Link>
        </nav>

        {/* Search Bar - Visible on small screens */}
        <div className='pb-9 block lg:hidden px-6'>
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
