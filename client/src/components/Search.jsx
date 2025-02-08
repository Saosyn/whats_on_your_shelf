import React from "react";

const Search = ({ query, setQuery, searchBooks }) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
      />
      <button onClick={searchBooks}>Search</button>
    </div>
  );
};

export default Search;
