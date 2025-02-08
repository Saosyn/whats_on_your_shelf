import React from "react";

const Search = ({ query, setQuery, searchBooks }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={searchBooks} style={{ padding: "10px 20px" }}>
        Search
      </button>
    </div>
  );
};

export default Search;