import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './header.component.css';  // 스타일을 여기에 추가합니다.

const HeaderComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const removeKey = () => {
    localStorage.removeItem('TMDb-Key');
    navigate('/signin');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div id="container">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-left">
          <div className="logo">
            <a href="/">
              <FontAwesomeIcon icon={faTicket} style={{ height: '100%', color: '#E50914' }} />
            </a>
          </div>
          <nav className="nav-links desktop-nav">
            <ul>
              <li><a href="/">홈</a></li>
              <li><a href="/popular">대세 콘텐츠</a></li>
              <li><a href="/wishlist">내가 찜한 리스트</a></li>
              <li><a href="/search">찾아보기</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <button className="icon-button" onClick={removeKey}>
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li><a href="/" onClick={toggleMobileMenu}>홈</a></li>
            <li><a href="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</a></li>
            <li><a href="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</a></li>
            <li><a href="/search" onClick={toggleMobileMenu}>찾아보기</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default HeaderComponent;
