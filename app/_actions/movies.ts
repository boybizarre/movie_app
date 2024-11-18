'use server';

export async function fetchMovies() {

  console.log('logging!!!');
  
  try {
    const url = `${process.env.MOVIE_URL as string}/popular`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // Throw an error for HTTP errors like 404 or 500
      const errorDetails = await response.json();
      console.error('errorDetails: ', errorDetails);
      throw new Error(
        `Error: ${response.status} - ${
          errorDetails.message || response.statusText
        }`
      );
    }

    return response.json();
  } catch (err) {
    console.error('err: ', err);
    return err;
  }
}

export async function fetchMovieById(movieId: number) {
  console.log('movieId: ', movieId);

  try {
    if (typeof movieId !== 'number') throw new Error('Invalid movieId');

    const url = `${process.env.MOVIE_URL as string}/${movieId}`;

    console.log(url);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      // Throw an error for HTTP errors like 404 or 500
      const errorDetails = await response.json();
      console.error('errorDetails: ', errorDetails);
      throw new Error(
        `Error: ${response.status} - ${
          errorDetails.message || response.statusText
        }`
      );
    }

    return response.json();

  } catch(err) {
    console.error('err: ', err);
    return err;
  }
}