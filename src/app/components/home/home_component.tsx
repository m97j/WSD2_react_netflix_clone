import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from '../../layout/header/header.component'; // Adjust the import path as needed

const HomeComponent = () => {
  return (
    <div>
      <HeaderComponent />
      {/* Your template content goes here */}
    </div>
  );
};

export default HomeComponent;

