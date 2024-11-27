import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import MovieInfiniteScrollComponent from '../../../views/views/movie-infinite-scroll.component';
import MovieGridComponent from '../../../views/views/movie-grid.component';
import URLService from '../../../util/movie/URL';
import './home-popular.component.css';

const HomePopularComponent: React.FC = () => {
  const [currentView, setCurrentView] = useState('grid');
  const apiKey = localStorage.getItem('TMDb-Key') || '';

  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll(); // cleanup to reset scroll behavior on unmount
    };
  }, []);

  const disableScroll = () => {
    document.body.style.overflow = 'hidden';
  };

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
  };

  const setView = (view: string) => {
    setCurrentView(view);
    if (view === 'grid') {
      disableScroll();
    } else {
      enableScroll();
    }
  };

  const fetchURL = (): string => {
    return URLService.getURL4PopularMovies(apiKey);
  };

  return (
    <div className="home-popular">
      <div className="view-toggle">
        <FontAwesomeIcon icon={faTh} onClick={() => setView('grid')} />
        <FontAwesomeIcon icon={faBars} onClick={() => setView('list')} />
      </div>
      {currentView === 'grid' ? (
        <MovieGridComponent fetchUrl={fetchURL()} />
      ) : (
        <MovieInfiniteScrollComponent
          genreId="0" // 예시 값
          apiKey={apiKey}
          ageId={-1} // 예시 값
          sortId="all" // 예시 값
          fetchUrl={fetchURL()}
        />

      )}
    </div>
  );
};

export default HomePopularComponent;
