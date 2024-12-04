import React from 'react';

interface BannerComponentProps {
  movie: {
    title: string;
    overview: string;
    backdrop_path: string;
  } | null;
}

const BannerComponent: React.FC<BannerComponentProps> = ({ movie }) => {
  const backdropUrl = movie ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '';

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {movie && (
        <div className="banner-content">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <button className="play-btn title-btn">재생</button>
          <button className="info-btn title-btn">상세 정보</button>
        </div>
      )}
    </div>
  );
};

export default BannerComponent;
