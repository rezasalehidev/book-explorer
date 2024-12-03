import { useLocation, useNavigate } from "react-router-dom";
import { Book } from "../models/Book";

const DetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state as Book;

  if (!book) {
    return (
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="mb-4">
          Back
        </button>
        <p>No book details available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 mt-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-300 px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="!mt-8">
        {book.coverId ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
            alt={book.title}
            className="mb-4"
          />
        ) : (
          <p>No cover available</p>
        )}
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p>Author: {book.authorName}</p>
        <p>First Published: {book.firstPublishYear}</p>
      </div>
    </div>
  );
};

export default DetailScreen;
