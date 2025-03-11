import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';

function Home({ searchTerm }) {
  return (
    <div>
      <Hero />
      <Products searchTerm={searchTerm} />
    </div>
  );
}

export default Home;
