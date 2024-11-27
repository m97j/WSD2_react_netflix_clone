import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './header.component.css';  // 스타일을 여기에 추가합니다.

//추가 설치 내용
//npm install react-router-dom @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons


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
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav>
        <FontAwesomeIcon icon={faBars} onClick={toggleMobileMenu} />
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <FontAwesomeIcon icon={faTimes} onClick={toggleMobileMenu} />
            {/* 여기에 모바일 메뉴 항목을 추가하세요 */}
          </div>
        )}
        {/* 나머지 헤더 콘텐츠를 여기에 추가합니다 */}
        <ul>
          <li>
            <FontAwesomeIcon icon={faSearch} />
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
          </li>
          <li>
            <FontAwesomeIcon icon={faTicket} />
          </li>
        </ul>
        <button onClick={removeKey}>Sign out</button>
      </nav>
    </header>
  );
};

export default HeaderComponent;
