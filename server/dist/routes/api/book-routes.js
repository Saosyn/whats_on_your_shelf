// get book info
// useful info will be:
// Title
// Author
// Genre
// Cover Art
// Description
// Series Name
// Length (Pages?)
const express = require('express');
const axios = require('axios'); // A library for making HTTP requests
const router = express();
router.use(express.json());
// GET route to fetch books from Open Library API
router.get('/books', async (req, res) => {
    try {
        const searchTerm = req.query.search; // Get the search term from query parameters
        // Fetch book data from Open Library API using axios
        const openLibraryResponse = await axios.get(`http://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&fields=title`);
        // Extract the titles from the response data
        const bookTitles = openLibraryResponse.data.docs.map((book) => book.title);
        res.status(200).json({ bookTitles });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error fetching books from Open Library API');
    }
});
export { router as bookRouter };
