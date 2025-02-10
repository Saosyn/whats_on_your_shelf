import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NYTBooks = () => {
  const [books, setBooks] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNYTBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/nyt-books');
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching NYT books:', err);
        setError('Failed to load books.');
      }
    };

    fetchNYTBooks();
  }, []);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Object.entries(books).map(([category, bookList]) => (
        <div key={category} className="p-4 border rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <ul>
            {bookList.map((book, index) => (
              <li key={index} className="mt-2 flex items-center space-x-4">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-16 h-auto rounded"
                  />
                ) : (
                  // Optionally, display a placeholder if no cover is available:
                  <div className="w-16 h-24 bg-gray-200 flex items-center justify-center rounded">
                    <span className="text-xs text-gray-500">No Cover</span>
                  </div>
                )}
                <div>
                  <strong>{book.title}</strong>
                  <p className="text-sm text-gray-700">by {book.author}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NYTBooks;
