import React from "react";
import BookCard from "./BookCard";

const SearchResults = ({ books, addToMyBooks, loading }) => {
  return (
    <div className="mt-20 flex flex-wrap justify-center align-middle">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "20px", 
          justifyContent: "center" 
        }}>
          {books.map((book) => (
            <BookCard key={book.id} book={book} addToMyBooks={addToMyBooks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
