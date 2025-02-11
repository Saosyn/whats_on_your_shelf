import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { nytBooksRouter } from './routes/nytBooksRouter.js';
import router from './routes/auth-routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../client/dist'));

// API Routes
app.use('/auth', router);
app.use('/api/nyt-books', nytBooksRouter);
app.use(routes);

// Database sync and server start
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import sequelize from './config/connection.js';
// import routes from './routes/index.js';
// import { nytBooksRouter } from './routes/nytBooksRouter.js';

// const app = express();
// const PORT = process.env.PORT || 3001; // Only define PORT once

// // Middleware
// app.use(cors()); // Enable CORS for API requests
// app.use(express.json());
// app.use(express.static('../client/dist')); // Serve frontend files

// // API Routes
// app.use('/api/nyt-books', nytBooksRouter);
// app.use(routes);

// // Database sync and server start
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is listening on port ${PORT}`);
//   });
// });
