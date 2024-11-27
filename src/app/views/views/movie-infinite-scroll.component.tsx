import React, { useState, useEffect, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Movie } from '../../../models/types';
import useWishlist from '../../util/movie/wishlist';
import './movie-infinite-scroll.component.css';

interface MovieInfiniteScrollComponentProps {
  genreId: string;
  apiKey: string;
  sortId?: string;
  ageId?: number;
  fetchUrl: string;
}

const MovieInfiniteScrollComponent: React.FC<MovieInfiniteScrollComponentProps> = ({
  genreId,
  apiKey,
  sortId = 'all',
  ageId = 100
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowSize, setRowSize] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hasMore, setHasMore] = useState(true);
  const [showTopButton, setShowTopButton] = useState(false);
  
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const loadingTriggerRef = useRef<HTMLDivElement>(null);
  const wishlistTimerRef = useRef<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setupIntersectionObserver();
    fetchMovies();
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (observer.current) {
        observer.current.disconnect();
      }
      if (wishlistTimerRef.current) {
        clearTimeout(wishlistTimerRef.current);
      }
    };
  }, []);

  const setupIntersectionObserver = () => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchMovies();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (loadingTriggerRef.current) {
      observer.current.observe(loadingTriggerRef.current);
    }
  };

  const fetchMovies = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const url = genreId === '0'
        ? 'https://api.themoviedb.org/3/movie/popular'
        : 'https://api.themoviedb.org/3/discover/movie';

      const params = {
        api_key: apiKey,
        language: 'ko-KR',
        page: currentPage,
        per_page: 10,
        ...(genreId !== '0' && { with_genres: genreId })
      };

      const response: AxiosResponse<{ results: Movie[] }> = await axios.get(url, { params });
      const newMovies = response.data.results;

      if (newMovies.length > 0) {
        let movieArray = [...movies, ...newMovies];

        if (sortId !== 'all') {
          movieArray = movieArray.filter(movie =>
            movie.original_language === sortId
          );
        }

        movieArray = movieArray.filter(movie => {
          if (ageId === -1) return true;
          if (ageId === -2) return movie.vote_average <= 4;
          return movie.vote_average >= ageId &&
            movie.vote_average < ageId + 1;
        });

        setMovies(movieArray);
        setCurrentPage(currentPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImageUrl = (path: string): string => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
  };

  const visibleMovieGroups = () => {
    return movies.reduce<Movie[][]>((resultArray, item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (gridContainerRef.current) {
      const containerWidth = gridContainerRef.current.offsetWidth;
      const movieCardWidth = isMobile ? 100 : 300;
      const horizontalGap = isMobile ? 10 : 15;
      setRowSize(Math.floor(containerWidth / (movieCardWidth + horizontalGap)));
    }
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowTopButton(scrollTop > 300);
  };

  const scrollToTopAndReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetMovies();
  };

  const resetMovies = () => {
    setMovies([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMovies();
  };

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container ${isMobile ? 'mobile' : 'desktop'}`}>
        {visibleMovieGroups().map((movieGroup, rowIndex) => (
          <div key={rowIndex} className={`movie-row ${movieGroup.length === rowSize ? 'full' : ''}`}>
            {movieGroup.map(movie => (
              <div key={movie.id} className="movie-card" onMouseUp={() => {
                if (wishlistTimerRef.current) {
                  clearTimeout(wishlistTimerRef.current);
                }
                wishlistTimerRef.current = window.setTimeout(() => {
                  toggleWishlist(movie);
                }, 800);
              }}>
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} loading="lazy" />
                <div className="movie-title">{movie.title}</div>
                {isInWishlist(movie.id) && <div className="wishlist-indicator">👍</div>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>

      {showTopButton && (
        <button onClick={scrollToTopAndReset} className="top-button" aria-label="맨 위로 이동">
          Top
        </button>
      )}
    </div>
  );
};

export default MovieInfiniteScrollComponent;
