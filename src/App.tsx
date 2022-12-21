import React from 'react';
import MainLayout from './layout/MainLayout';
import AppRouter from './router/AppRouter';
import './styles/app.css';

export const App = () => {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
};

export default App;
