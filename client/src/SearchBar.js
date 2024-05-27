// SearchBar.js
import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import './Search.css';

const SearchBar = () => {
  return (
    <div className="search-container">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
        <FaFilter className="filter-icon" />
      </div>
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
