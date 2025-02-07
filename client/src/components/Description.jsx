import React, { useState } from 'react';

const Description = (query) => {
  // const query = query;
  // const [query, setQuery] = useState('');
  const [desc, setDesc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from API
  // @ts-ignore
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/works${query}.json`
      );
      if (!response.ok)
        throw new Error('Network response was not ok for description');

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        setDesc(result);
      } else {
        throw new Error('Invalid response format (not JSON)(for description)');
      }
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change and API call

  fetchData();

  return (
    <div className="p-4 max-w-md mx-auto">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {desc && (
        <ul className="mt-4 border p-2 rounded">
          <li className="border-b p-2 last:border-0">
            <p>
              {
                // @ts-ignore
                desc.description
              }
            </p>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Description;
