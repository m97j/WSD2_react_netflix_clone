import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import useWishlist from '../../util/movie/wishlist';

//추가설치
//npm install axios

interface MovieRowComponentProps {
  title: string;
  url: string;
}

const MovieRowComponent: React.FC<MovieRowComponentProps> = ({ title, url }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  //const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderWindowRef = useRef<HTMLDivElement>(null);
  const { toggleWishlist, isInWishlist } = useWishlist();
  let touchStartX = 0;
  let touchEndX = 0;

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [url]);

  const calculateMaxScroll = useCallback((): number => {
    if (sliderRef.current && sliderWindowRef.current) {
      return sliderRef.current.scrollWidth - sliderWindowRef.current.clientWidth;
    }
    return 0; // 항상 number를 반환하도록 보장
  }, []);
  

  const slide = (direction: 'left' | 'right', amount: number | null = null) => {
    if (sliderWindowRef.current) {
      const slideAmount = amount || sliderWindowRef.current.clientWidth * 0.8;
      setScrollAmount((prev) =>
        direction === 'left'
          ? Math.max(0, prev - slideAmount)
          : Math.min(calculateMaxScroll(), prev + slideAmount)
      );
    }
  };


  const handleResize = useCallback(() => {
    calculateMaxScroll();
    setScrollAmount((prev) => Math.min(prev, calculateMaxScroll()));
  }, [calculateMaxScroll, setScrollAmount]); // 필요한 의존성 추가
  

  const handleMouseMove = () => setShowButtons(true);
  const handleMouseLeave = () => setShowButtons(false);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    if (Math.abs(touchDiff) > minSwipeDistance) {
      const direction = touchDiff > 0 ? 'right' : 'left';
      slide(direction, Math.abs(touchDiff));
    }
  };

  useEffect(() => {
    fetchMovies();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fetchMovies, handleResize]);

  useEffect(() => {
    calculateMaxScroll();
  }, [calculateMaxScroll]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div
        className="movie-row-slider-window"
        ref={sliderWindowRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="movie-row-slider"
          ref={sliderRef}
          style={{ transform: `translateX(-${scrollAmount}px)` }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="movie-row-item">
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
              <button onClick={() => toggleWishlist(movie)}>
                {isInWishlist(movie.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          ))}
        </div>
      </div>
      {showButtons && (
        <>
          <button onClick={() => slide('left')}>Left</button>
          <button onClick={() => slide('right')}>Right</button>
        </>
      )}
    </div>
  );
};

export default MovieRowComponent;
