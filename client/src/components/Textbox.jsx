import { useState } from "react";
import Search from "./Search";
import BookCard from "./BookCard";

const Textbox = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const addToMyBooks = (book) => {
    setMyBooks((prevBooks) => {
      if (prevBooks.has(book.id)) return prevBooks;
      const updatedBooks = new Map(prevBooks);
      updatedBooks.set(book.id, book.title);
      return updatedBooks;
    });
  };

  return (
    <div>
      <h1>Book Search</h1>
      <Search query={query} setQuery={setQuery} searchBooks={searchBooks} />
      {loading && <p>Loading...</p>}
      <div style={{ marginTop: "20px" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} addToMyBooks={addToMyBooks} />
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>My Books</h2>
        {myBooks.size === 0 ? (
          <p>No books added yet.</p>
        ) : (
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