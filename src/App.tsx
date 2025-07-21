import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './app/components/signIn/Signin';
import Home from './app/components/home/home_component';
import HomeMain from './app/components/home/main/home-main_component';
import HomePopular from './app/components/home/popular/home-popular_component';
import HomeWishlist from './app/components/home/wishlist/home-wishlist_component';
import HomeSearch from './app/components/search/home-search.component';
import PrivateRoute from './app/guards/auth.guards'; // PrivateRoute 컴포넌트 임포트
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Router basename='/WSD2_react_netflix_clone'>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<PrivateRoute component={Home} />}>
            <Route index element={<HomeMain />} />
            <Route path="popular" element={<HomePopular />} />
            <Route path="wishlist" element={<HomeWishlist />} />
            <Route path="search" element={<HomeSearch />} />
            
          </Route>
          <Route
            path="*"
            element={<PrivateRoute component={() => <Navigate to="/signin" />} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
