import { useState } from 'react';

const Textbox = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  // using a map so we only store new entries
  const [myBooks, setMyBooks] = useState(new Map());

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
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
            id: book.key, 
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

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => {
      if (prevBooks.has(book.id)) return prevBooks;
      const updatedBooks = new Map(prevBooks);
      //this might make things a little more complicated in the long run, but for now storing unique ids and titles makes it easier to show in my books section
      updatedBooks.set(book.id, book.title); 
      return updatedBooks;
    });
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
        {books.map((book) => (
          <div
            key={book.id}
            style={{ borderBottom: '1px solid #ddd', padding: '15px 0' }}
          >
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <img
              src={book.cover}
              alt={book.title}
              style={{ width: '150px', height: 'auto' }}
            />
            <p className="text-blue-900 text-2xl">{book.description}</p>
            <button onClick={() => addToMyBooks(book)}>Add to "My Books"</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>My Books</h2>
        {myBooks.size === 0 ? <p>No books added yet.</p> : (
          <ul>
            {[...myBooks.entries()].map(([bookId, title]) => (
              <li key={bookId}>{title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Textbox;
