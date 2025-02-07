import React, { useState } from 'react';

const Description = () => {
  const query = "OL45804W";
  // const [query, setQuery] = useState('');
  const [desc, setDesc] = useState(null);

  // Function to fetch data from API
  // @ts-ignore
  const fetchData = async () => {

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

  };
  }
  // Handle input change and API call

  fetchData();

  return (
    <div className="p-4 max-w-md mx-auto">
      {<ul className="mt-4 border p-2 rounded">
          <li className="border-b p-2 last:border-0">
            <p>
              {
                // @ts-ignore
                <p> {desc}</p>
              }
            </p>
          </li>
        </ul>
      }
    </div>
  );
};

export default Description;
