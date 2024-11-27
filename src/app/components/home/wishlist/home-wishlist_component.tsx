import React from 'react';
import useWishlist from '../../../util/movie/wishlist';
import { Movie } from '../../../../models/types';

const MovieWishlistComponent: React.FC = () => {
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div>
      <h1>My Wishlist</h1>
      <ul>
        {wishlist.map((movie: Movie) => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => toggleWishlist(movie)}>
              {isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieWishlistComponent;
