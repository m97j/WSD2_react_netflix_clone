import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../../layout/header/header.component'; // Adjust the import path as needed

const HomeComponent = () => {
  return (
    <div id="app">
      <HeaderComponent />
      <div id="container">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeComponent;
