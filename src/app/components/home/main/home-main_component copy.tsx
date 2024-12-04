import React, { useState, useEffect } from 'react';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BannerComponent from '../../../views/home_main/banner.component';
import MovieRowComponent from '../../../views/home_main/movie-row.component';
import URLService from '../../../util/movie/URL';
import './home-main.component.css';

const HomeMainComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const apiKey = localStorage.getItem('TMDb-Key') || '';

  const popularMoviesUrl = URLService.getURL4PopularMovies(apiKey);
  const newReleasesUrl = URLService.getURL4ReleaseMovies(apiKey);
  const actionMoviesUrl = URLService.getURL4GenreMovies(apiKey, '28');

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      const movie = await URLService.fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    loadFeaturedMovie();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [apiKey]);

  return (
    <div>
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faUser} />
      </header>
      <BannerComponent movie={featuredMovie} />
      <MovieRowComponent fetchUrl={popularMoviesUrl} title="Popular Movies" />
      <MovieRowComponent fetchUrl={newReleasesUrl} title="New Releases" />
      <MovieRowComponent fetchUrl={actionMoviesUrl} title="Action Movies" />
    </div>
  );
};

export default HomeMainComponent;
