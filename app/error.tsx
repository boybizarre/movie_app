'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
}: {
  error: Error extends { statusCode: number } ? Error : any;
}) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-gray-800'>
          {error.statusCode || '404'}
        </h1>
        <p className='mt-4 text-xl text-gray-600'>
          {error.statusCode
            ? `An error ${error.statusCode} occurred on the server.`
            : 'Page not found.'}
        </p>

        <div className='mt-6'>
          <Link href='/'>
            <p className='px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
              Go Back to Home
            </p>
          </Link>
        </div>
      </div>

      {/* <div className='mt-10'>
        <img
          src='/images/error-illustration.svg' // Replace with your own illustration/image
          alt='Error Illustration'
          className='w-64 md:w-96'
        />
      </div> */}
    </div>
  );
}
