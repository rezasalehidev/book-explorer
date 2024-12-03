import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../services/api";
import { Book } from "../models/Book";
import { debounce } from "lodash";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const results = await fetchBooks(searchQuery);

      if (results.length > 0) {
        setBooks(results);
        setError("");
      } else {
        setBooks([]);
        setError("No books found for your search.");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce(
    (searchQuery: string) => handleSearch(searchQuery),
    500
  );

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSelectBook = (book: Book) => {
    navigate(`/book/${book.coverId}`, { state: book });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books Explorer</h1>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder="Search for books..."
        className="border p-2 w-full mb-4"
      />
      {loading && <p>Loading...</p>}

      {/* Show error */}
      {!loading && error && <p className="text-red-500">{error}</p>}

      {/* Show list books */}
      {books.length > 0 && (
        <ul>
          {books.map((book) => (
            <li
              key={book.id}
              className="mt-4 cursor-pointer hover:bg-gray-100 p-2"
              onClick={() => handleSelectBook(book)}
            >
              <div className="flex items-center">
                {book.coverId && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                    alt={`Cover of ${book.title}`}
                    className="w-16 h-24 mr-4"
                  />
                )}
                <div>
                  <h2 className="font-bold">{book.title}</h2>
                  <p>Author: {book.authorName}</p>
                  <p>First Published: {book.firstPublishYear}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchScreen;
