import React, { useState } from "react";

const Textbox = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from API
  // @ts-ignore
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {

      const result = await response.json();
      setData(result); } else {
        throw new Error("Invalid response format (not JSON)");
      }      
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and API call
  const handleChange = (/** @type {{ target: { value: any; }; }} */ e) => {
    const value = e.target.value;
    setQuery(value);
    fetchData(value); // Call API immediately (or debounce this)
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        value={query}
        // @ts-ignore
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 w-full rounded"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <ul className="mt-4 border p-2 rounded">
          {data.
          docs?.map((item, index) => (
            <li key={index} className="border-b p-2 last:border-0">
              <p>{item.title}</p> 
              <p>{item.author_name}</p>
              <img src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`} />
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchData}>Search</button>
    </div>
  );
};

export default Textbox;