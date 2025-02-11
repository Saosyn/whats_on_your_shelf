import React from 'react';
import BookCard from './BookCard';
import rommel from '../assets/rommel.jpg';

const SearchResults = ({ books, addToMyBooks, loading }) => {
  return (
    <div className="mt-20 flex flex-wrap justify-center align-middle">
      {loading ? (
        <img src={rommel} alt="Loading..." className="w-1/2 h-auto" />
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} addToMyBooks={addToMyBooks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
