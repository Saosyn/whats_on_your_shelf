// get book info
// useful info will be:

// Title
// Author
// Genre
// Cover Art
// Description
// Series Name
// Length (Pages?)

import type { Request, Response } from 'express';
import express from 'express';
import axios from 'axios';

// const express = require('express');
// const axios = require('axios'); // A library for making HTTP requests
const router = express();
router.use(express.json());

// GET route to fetch books from Open Library API
router.get('/', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.search as string; // Get the search term from query parameters

    // Fetch book data from Open Library API using axios
    const openLibraryResponse = await axios.get(
      `http://openlibrary.org/search.json?q=${encodeURIComponent(
        searchTerm
      )}&fields=title`
    );
    const responseData = await openLibraryResponse.data;
    // Extract the titles from the response data
    const bookTitles = responseData.docs.map(
      (book: { title: string }) => book.title
    );

    res.status(200).json({ bookTitles });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error fetching books from Open Library API');
  }
});



export { router as bookRouter };
