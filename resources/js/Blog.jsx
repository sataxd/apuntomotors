import React, { useState } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';
import Filter from './components/Blog/Filter';
import Results from './components/Blog/Results';
import { CarritoProvider } from './context/CarritoContext';

function Blog({ categories, showSlogan = true }) {
  const [filter, setFilter] = useState({
    category: null,
    search: null,
    sortOrder: 'asc',
  });

  return (
    <>
      <Header showSlogan={showSlogan} />

      <Filter categories={categories} filter={filter} setFilter={setFilter} />

      <Results filter={filter} />

      <Footer />
    </>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(
    <CarritoProvider>
      <Base {...properties}>
        <Blog {...properties} />
      </Base>
    </CarritoProvider>
  );
});