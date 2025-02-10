import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
router.use(express.json());

// Get the API key from the environment variables
const NYT_API_KEY = process.env.NYT_API_KEY;

if (!NYT_API_KEY) {
  throw new Error('NYT_API_KEY is not defined in your environment variables');
}

// Define the three categories for the homepage
const categories = [
  { name: 'Young Adult', list: 'young-adult' },
  { name: 'Nonfiction', list: 'combined-print-and-e-book-nonfiction' },
  { name: 'Science', list: 'science' },
];

router.get('/', async (_req: Request, res: Response) => {
  try {
    const bookData: Record<string, any[]> = {};

    for (const category of categories) {
      // Construct the URL for the current best-sellers list of each category
      const url = `https://api.nytimes.com/svc/books/v3/lists/current/${category.list}.json?api-key=${NYT_API_KEY}`;
      console.log(`Fetching URL: ${url}`);

      const response = await axios.get(url);
      // Assume the API returns an object with results.books as an array.
      // We slice the first 5 items for each category.
      bookData[category.name] = response.data.results.books.slice(0, 5);
    }

    res.status(200).json(bookData);
  } catch (error) {
    console.error('Error fetching NYT books:', error);
    res.status(500).send('Error fetching books from NYT API');
  }
});

export { router as nytBooksRouter };
