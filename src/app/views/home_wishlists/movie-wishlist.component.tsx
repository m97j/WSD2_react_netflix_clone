import React, { useState, useEffect, useRef, useCallback } from 'react';
import useWishlist from '../../util/movie/wishlist';
import { Movie } from '../../../models/types';
import './movie-wishlist.component.css';

const MovieWishlistComponent: React.FC = () => {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [rowSize, setRowSize] = useState(4);
  const [moviesPerPage, setMoviesPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleWishlistMovies, setVisibleWishlistMovies] = useState<Movie[][]>([]);
  
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [wishlist]);

  useEffect(() => {
    updateVisibleMovies();
  }, [wishlist, currentPage, rowSize, moviesPerPage]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    calculateLayout();
  }, []);

  const calculateLayout = () => {
    if (gridContainerRef.current) {
      const containerWidth = gridContainerRef.current.offsetWidth;
      const containerHeight = window.innerHeight - gridContainerRef.current.offsetTop;
      const movieCardWidth = isMobile ? 90 : 220;
      const movieCardHeight = isMobile ? 150 : 330;
      const horizontalGap = isMobile ? 10 : 15;
      const verticalGap = -10;

      const newRowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
      const newMoviesPerPage = newRowSize * maxRows;

      setRowSize(newRowSize);
      setMoviesPerPage(newMoviesPerPage);
    }
  };

  const updateVisibleMovies = () => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = wishlist.slice(startIndex, endIndex);

    const newVisibleWishlistMovies = paginatedMovies.reduce((resultArray: Movie[][], item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);

    setVisibleWishlistMovies(newVisibleWishlistMovies);
  };

  const getImageUrl = (path: string): string => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
  };

  const totalPages = Math.ceil(wishlist.length / moviesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div ref={gridContainerRef} className="grid-container">
        {visibleWishlistMovies.map((row, rowIndex) => (
          <div key={rowIndex} className="movie-row">
            {row.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <button onClick={() => toggleWishlist(movie)}>
                  {isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieWishlistComponent;
