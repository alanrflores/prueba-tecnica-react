import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movies from './Movies';
import MoviesDetail from './MoviesDetail';
import Layout from './Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
