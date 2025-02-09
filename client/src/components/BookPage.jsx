import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
    //We're gonna use useParams here to pull everything after the route
    // book/works/{params} 
    // Then we need to remove the / at the beginning so it doesn't mess up the route
  const { workId } = useParams();
  const formattedWorkId = workId?.replace(/^\//, ""); 

  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!formattedWorkId) {
      setError("Invalid book ID");
      return;
    }

    const fetchBookDetails = async () => {
        const formattedWorkId = `/works/${workId}`;
        const apiUrl = `https://openlibrary.org${formattedWorkId}.json`;
      
        console.log("Fetching book details from:", apiUrl);
      
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          
          // Keeping this log in - was helpful
          console.log(data);
      
          const coverId = data.covers ? data.covers[0] : null;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : "https://via.placeholder.com/150";
      
          setBook({
            title: data.title,
            author: data.authors && data.authors.length > 0 ? data.authors[0].name : "Unknown Author",
            description:
              data.description?.value || data.description || "No description available.",
            cover: coverUrl,
          });
        } catch (err) {
          console.error("Error fetching book details:", err);
          setError("Failed to fetch book details.");
        }
      };
      
      
    fetchBookDetails();
  }, [formattedWorkId]);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto flex">
      <div className="w-1/3">
        <img src={book.cover} alt={book.title} className="w-full h-auto rounded-md" />
      </div>
      <div className="w-2/3 pl-6">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        {/* It looks like this API returns author IDs and not Author names...  */}
        {/* <h2 className="text-lg text-gray-700">{book.author}</h2> */}
        <p className="mt-4 text-gray-600">{book.description}</p>
      </div>
    </div>
  );
};

export default BookPage;
