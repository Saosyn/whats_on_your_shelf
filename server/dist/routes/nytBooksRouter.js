import express from 'express';
import axios from 'axios';
const router = express.Router();
router.use(express.json());
const NYT_API_KEY = process.env.NYT_API_KEY;
if (!NYT_API_KEY) {
    throw new Error('NYT_API_KEY is not defined in your environment variables');
}
// Define the three categories you want on your homepage.
const categories = [
    { name: 'Young Adult', list: 'young-adult' },
    { name: 'Nonfiction', list: 'combined-print-and-e-book-nonfiction' },
    { name: 'Science', list: 'science' },
];
router.get('/', async (_req, res) => {
    try {
        const bookData = {};
        // Loop through each category.
        for (const category of categories) {
            const nytUrl = `https://api.nytimes.com/svc/books/v3/lists/current/${category.list}.json?api-key=${NYT_API_KEY}`;
            console.log(`Fetching NYT data from: ${nytUrl}`);
            const nytResponse = await axios.get(nytUrl);
            // Grab the top 5 books.
            const nytBooks = nytResponse.data.results.books.slice(0, 5);
            // For each book, try to get the cover image from Open Library.
            const booksWithCovers = await Promise.all(nytBooks.map(async (book) => {
                try {
                    // Use the book title for searching Open Library.
                    const olResponse = await axios.get('https://openlibrary.org/search.json', {
                        params: { title: book.title },
                    });
                    const docs = olResponse.data.docs;
                    if (docs && docs.length > 0 && docs[0].cover_i) {
                        // Build the cover URL.
                        const coverId = docs[0].cover_i;
                        book.coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
                    }
                    else {
                        book.coverUrl = null; // Or assign a default cover image URL.
                    }
                }
                catch (olError) {
                    console.error(`Error fetching cover for "${book.title}":`, olError);
                    book.coverUrl = null;
                }
                return book;
            }));
            // Attach the books with covers to the category name.
            bookData[category.name] = booksWithCovers;
        }
        res.status(200).json(bookData);
    }
    catch (error) {
        console.error('Error fetching NYT books:', error);
        res.status(500).send('Error fetching books from NYT API');
    }
});
export { router as nytBooksRouter };
