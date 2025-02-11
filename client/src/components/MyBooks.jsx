import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBooks = localStorage.getItem("myBooks");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  const handleBookClick = (workId) => {
    navigate(`/book${workId}`);
  };

  const handleRemoveBook = (workId) => {
    const updatedBooks = books.filter(([id]) => id !== workId);
    setBooks(updatedBooks);
    localStorage.setItem("myBooks", JSON.stringify(updatedBooks));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">My Book List</h2>
      {books.length > 0 ? (
        <ul className="list-disc list-inside">
          {books.map(([workId, title], index) => (
            <li key={index} className="flex justify-between items-center">
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleBookClick(workId)}
              >
                {title}
              </span>
              <button
                className="ml-4 px-3 py-1 text-sm text-white bg-red-200 rounded hover:bg-red-600"
                onClick={() => handleRemoveBook(workId)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No books saved.</p>
      )}
    </div>
  );
};

export default BookList;
