import React from 'react';

interface BannerComponentProps {
  movie: {
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
      {/* 추가적으로 영화 정보 표시 */}
    </div>
  );
};

export default BannerComponent;
