import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState(new Map());

  useEffect(() => {
    const savedBooks = localStorage.getItem("myBooks");
    if (savedBooks) {
      setMyBooks(new Map(JSON.parse(savedBooks)));
    }
  }, []);

  const removeFromMyBooks = (bookId) => {
    setMyBooks((prevBooks) => {
      const updatedBooks = new Map(prevBooks);
      updatedBooks.delete(bookId);
      localStorage.setItem("myBooks", JSON.stringify([...updatedBooks]));
      return updatedBooks;
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>My Books</h2>
      {myBooks.size === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "20px", 
          justifyContent: "center" 
        }}>
          {[...myBooks.entries()].map(([bookId, title]) => (
            <BookCard key={bookId} book={{ id: bookId, title }} addToMyBooks={removeFromMyBooks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
