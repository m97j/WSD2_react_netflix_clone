import { useState, useEffect } from 'react';
import { Movie } from '../../../models/types'; // Movie 타입을 가져옵니다.

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('movieWishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const saveWishlist = (wishlist: Movie[]) => {
    localStorage.setItem('movieWishlist', JSON.stringify(wishlist));
  };

  const toggleWishlist = (movie: Movie) => {
    const index = wishlist.findIndex(item => item.id === movie.id);
    if (index === -1) {
      const newWishlist = [...wishlist, movie];
      setWishlist(newWishlist);
      saveWishlist(newWishlist);
    } else {
      const newWishlist = wishlist.filter(item => item.id !== movie.id);
      setWishlist(newWishlist);
      saveWishlist(newWishlist);
    }
  };

  const isInWishlist = (movieId: number): boolean => {
    return wishlist.some(item => item.id === movieId);
  };

  return { wishlist, toggleWishlist, isInWishlist };
};

export default useWishlist;
