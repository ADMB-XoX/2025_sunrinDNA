import React from 'react';
import './PopularBooks.css';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
}

const books: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "",
    rating: 4.5
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "",
    rating: 4.8
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    cover: "",
    rating: 4.7
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "",
    rating: 4.6
  }
];

const PopularBooks: React.FC = () => {
  return (
    <section className="popular-books">
      <h2 className="section-title">POPULAR BOOK</h2>
      <div className="books-container">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.cover} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-rating">
                <span className="rating-text">{book.rating}</span>
                <span className="rating-star">★</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBooks;
