# What's On Your Shelf

**What's On Your Shelf** is a full-stack web application that lets users browse, search for, and manage books using real-world data from the New York Times and Open Library APIs. Whether you want to explore current best sellers or keep track of your personal reading list, our app makes it fun and easy—all while your bookshelf never gets dusty!

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
  - [Home Page](#home-page)
  - [Book Search](#book-search)
  - [Personal Library](#personal-library)
  - [Sign Up Modal](#sign-up-modal)
- [API Integrations](#api-integrations)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and JWT-based authentication.
- **Book Searching:** Search for books via the Open Library API with dynamic cover image retrieval.
- **NYT Best Sellers:** View current best seller lists from the New York Times API with covers (retrieved via Open Library when available).
- **Personal Library:** Add books to your personal library, stored in local storage.
- **Responsive UI:** Built with React and Tailwind CSS.
- **Full-Stack Architecture:** Powered by Node.js, Express.js, and PostgreSQL (with Sequelize ORM).
- **Deployment Ready:** Deployed using Render, with environment variables for sensitive data.

## Technologies

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Sequelize ORM)
- **Authentication:** JWT
- **APIs:** New York Times Books API, Open Library API
- **Deployment:** Render
- **Version Control:** GitHub

## Installation

_(Installation instructions go here...)_

## Usage

### Home Page

- **Explore NYT Best Sellers:**  
  Browse current best sellers by category (e.g., Young Adult, Combined Print and E-book Nonfiction, Science).
- **Book Details:**  
  Each book displays its cover (or a default image if unavailable), along with its title, author, and description.

### Book Search

- **Search Functionality:**  
  Use the search box to look for books via Open Library.
- **Results Display:**  
  Search results are shown in a card format with an option to add a book to your personal library.

### Personal Library

- **Manage Your Books:**  
  Your saved books are stored in local storage.
- **Interact:**  
  Click on a book title to view details or remove it from your library.

### Sign Up Modal

- **Under Construction:**  
  The sign up functionality is currently under construction.
- **Modal Message:**  
  When users click "Sign Up," a modal appears with a placeholder message.

## API Integrations

- **New York Times Books API:**  
  Retrieves best-seller lists using endpoints like:
  https://api.nytimes.com/svc/books/v3/lists/current/{list}.json?api-key=your_nyt_api_key
  The app uses categories such as "young-adult", "combined-print-and-e-book-nonfiction", and "science".

- **Open Library API:**  
  Used for searching books, fetching book details, and retrieving cover images. If a cover isn’t available, a default placeholder image is displayed.
