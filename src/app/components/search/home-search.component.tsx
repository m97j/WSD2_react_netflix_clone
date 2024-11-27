import React, { useState } from 'react';
import MovieSearchComponent from '../../views/search/movie-search.component';
import { SearchOptions } from '../../../models/types';
import MovieInfiniteScrollComponent from '../../views/views/movie-infinite-scroll.component';
import './home-search.component.css';

const HomeSearchComponent: React.FC = () => {
  const apiKey = localStorage.getItem('TMDb-Key') || '';
  const [genreId, setGenreId] = useState<string>('28');
  const [ageId, setAgeId] = useState<number>(-1);
  const [sortId, setSortId] = useState<string>('all');

  const genreCode: { [key: string]: number } = {
    '장르 (전체)': 0,
    'Action': 28,
    'Adventure': 12,
    'Comedy': 35,
    'Crime': 80,
    'Family': 10751,
  };

  const sortingCode: { [key: string]: string } = {
    '언어 (전체)': 'all',
    '영어': 'en',
    '한국어': 'ko',
  };

  const ageCode: { [key: string]: number } = {
    '평점 (전체)': -1,
    '9~10': 9,
    '8~9': 8,
    '7~8': 7,
    '6~7': 6,
    '5~6': 5,
    '4~5': 4,
    '4점 이하': -2,
  };

  const changeOptions = (options: SearchOptions) => {
    setGenreId(`${genreCode[options.originalLanguage]}`);
    setAgeId(ageCode[options.translationLanguage]);
    setSortId(sortingCode[options.sorting]);
  };

  return (
    <div className="home-search">
      <MovieSearchComponent changeOptions={changeOptions} />
      <MovieInfiniteScrollComponent apiKey={apiKey} genreId={genreId} ageId={ageId} sortId={sortId} fetchUrl=''/>
    </div>
  );
};

export default HomeSearchComponent;
