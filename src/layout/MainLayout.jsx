import React, { useState } from 'react';
import Header from '../components/Header';

function MainLayout({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { searchTerm })
      )}
    </div>
  );
}

export default MainLayout;
