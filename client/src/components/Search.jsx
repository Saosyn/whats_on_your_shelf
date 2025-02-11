import React from "react";

const Search = ({ query, setQuery, searchBooks }) => {
  return (
    <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md w-2/3 h-12">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="w-full p-3 border border-gray-300 rounded-xl h-8 focus:outline-none focus:ring-2 focus:ring-[#FF7272]"
      />
      <button
        onClick={searchBooks}
        className="h-8 px-5 bg-[#FF7272] text-white rounded-lg hover:bg-[#FF3737] transition flex items-center justify-center cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
