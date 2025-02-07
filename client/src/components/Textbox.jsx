import { useState } from 'react';

const Textbox = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=10`
      );
      const data = await response.json();
      const booksData = await Promise.all(
        data.docs.slice(0, 5).map(async (book) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : 'https://via.placeholder.com/150';

          const detailsResponse = await fetch(
            `https://openlibrary.org${book.key}.json`
          );
          const details = await detailsResponse.json();
          const description =
            details.description?.value ||
            details.description ||
            'No description available.';

          return {
            title: book.title,
            author: book.author_name?.join(', ') || 'Unknown Author',
            cover: coverUrl,
            description: description,
          };
        })
      );
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Book Search</h1>
      <input
        type="text"
        placeholder="Search for a book..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={searchBooks} style={{ padding: '10px 20px' }}>
        Search
      </button>
      {loading && <p>Loading...</p>}
      <div style={{ marginTop: '20px' }}>
        {books.map((book, index) => (
          <div
            key={index}
            style={{ borderBottom: '1px solid #ddd', padding: '15px 0' }}
          >
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: '150px', height: 'auto' }}
            />
            <p className="text-yellow-300">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Textbox;
