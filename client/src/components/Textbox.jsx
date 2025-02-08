import React from "react";
import { useState, useEffect } from "react";
import Search from "./Search";
import SearchResults from "./SearchResults";
import MyBooks from "./MyBooks";

const Textbox = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myBooks, setMyBooks] = useState(new Map());

  // Load saved books from localStorage when component mounts
  useEffect(() => {
    const savedBooks = localStorage.getItem("myBooks");
    if (savedBooks) {
      setMyBooks(new Map(JSON.parse(savedBooks)));
    }
  }, []);

  // Function to store books in localStorage
  const saveToLocalStorage = (booksMap) => {
    localStorage.setItem("myBooks", JSON.stringify([...booksMap]));
  };

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => {
      if (prevBooks.has(book.id)) return prevBooks;
      const updatedBooks = new Map(prevBooks);
      updatedBooks.set(book.id, 
       book.title,
      );
  
      saveToLocalStorage(updatedBooks); // Save to local storage
      return updatedBooks;
    });
  };
  // **Re-adding the missing searchBooks function**
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
            : "https://via.placeholder.com/150";

          const detailsResponse = await fetch(
            `https://openlibrary.org${book.key}.json`
          );
          const details = await detailsResponse.json();
          const description =
            details.description?.value ||
            details.description ||
            "No description available.";

          return {
            id: book.key,
            title: book.title,
            author: book.author_name?.join(", ") || "Unknown Author",
            cover: coverUrl,
            description: description,
          };
        })
      );
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Book Search</h1>
      {/* Now searchBooks is correctly passed down */}
      <Search query={query} setQuery={setQuery} searchBooks={searchBooks} />
      <SearchResults books={books} addToMyBooks={addToMyBooks} loading={loading} />
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
