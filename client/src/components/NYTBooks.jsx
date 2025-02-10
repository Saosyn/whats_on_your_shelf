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
          <h2 className="text-xl font-bold">{category}</h2>
          <ul>
            {bookList.map((book, index) => (
              <li key={index} className="mt-2">
                <strong>{book.title}</strong> by {book.author}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default NYTBooks;
