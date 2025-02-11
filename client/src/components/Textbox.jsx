import React, { useState, useEffect } from 'react';
import Search from './Search';
import SearchResults from './SearchResults';
import MyBooks from './MyBooks';

const Textbox = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  // myBooks will be a Map where each key is a book id and each value is an object with just { title }
  const [myBooks, setMyBooks] = useState(new Map());

  // Load saved books from localStorage when component mounts
  useEffect(() => {
    try {
      const savedBooks = localStorage.getItem('myBooks');
      if (savedBooks) {
        setMyBooks(new Map(JSON.parse(savedBooks)));
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      setMyBooks(new Map());
    }
  }, []);

  // Save only the id and title in localStorage
  const saveToLocalStorage = (booksMap) => {
    try {
      localStorage.setItem('myBooks', JSON.stringify([...booksMap]));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => {
      if (prevBooks.has(book.id)) return prevBooks;
      const updatedBooks = new Map(prevBooks);
      // Store only the book id and title
      updatedBooks.set(book.id, { title: book.title });
      saveToLocalStorage(updatedBooks);
      return updatedBooks;
    });
  };

  // Search books function (using Open Library)
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
            : 'https://dummyimage.com/150x200/cccccc/ffffff&text=No+Cover';

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

  return (
    <div className="flex flex-wrap justify-center items-center">
      <Search query={query} setQuery={setQuery} searchBooks={searchBooks} />
      <SearchResults
        books={books}
        addToMyBooks={addToMyBooks}
        loading={loading}
        myBooks={myBooks}
      />
      <MyBooks myBooks={myBooks} />
    </div>
  );
};

export default Textbox;

// const addToMyBooks = (book) => {
//   setMyBooks((prevBooks) => {
//     if (prevBooks.has(book.id)) return prevBooks;
//     const updatedBooks = new Map(prevBooks);
//     updatedBooks.set(book.id, book);
//     localStorage.setItem("myBooks", JSON.stringify([...updatedBooks]));
//     return updatedBooks;
//   });
// };

// const removeFromMyBooks = (book) => {
//   setMyBooks((prevBooks) => {
//     const updatedBooks = new Map(prevBooks);
//     updatedBooks.delete(book.id);
//     localStorage.setItem("myBooks", JSON.stringify([...updatedBooks]));
//     return updatedBooks;
//   });

// const addToMyBooks = (book) => {
//   setMyBooks((prevBooks) => {
//     if (prevBooks.has(book.id)) return prevBooks;
//     const updatedBooks = new Map(prevBooks);
//     updatedBooks.set(book.id, {
//       title: book.title,
//       cover: book.cover,
//       author: book.author,
//       description: book.description,
//     });
