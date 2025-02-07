import { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  

  // Function to fetch data from API
  // @ts-ignore
  const fetchData = async () => {

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${query}&limit=1`
      );
      if (!response.ok) throw new Error('Network response was not ok');

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error('Invalid response format (not JSON)');
      }
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  };

  // Handle input change and API call
//   const handleChange = (/** @type {{ target: { value: any; }; }} */ e) => {
//     const value = e.target.value;
//     setQuery(value);
//     fetchData(value); // Call API immediately (or debounce this)
//   };

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
      <button onClick={fetchData}>Search</button>
    </div>
  );
};

export default Search;
