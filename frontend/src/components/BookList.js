import { useEffect, useState } from "react";
import API from "../services/api";

function BookList() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await API.get("/");
    setBooks(res.data);
  };

  // UPDATE COPIES (+ / -)
  const updateCopies = async (id, amount) => {
    try {
      await API.put(`/copies/${id}`, { amount });
      fetchBooks();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // DELETE BOOK (only when copies = 0)
  const deleteBook = async (id) => {
    try {
      await API.delete(`/${id}`);
      fetchBooks();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>📚 Library Books</h2>

      {books.map((book) => (
        <div
          key={book._id}
          style={{
            border: "1px solid gray",
            margin: 10,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <h3>{book.title}</h3>
          <p><b>Author:</b> {book.author}</p>
          <p><b>Category:</b> {book.category}</p>
          <p><b>Year:</b> {book.publishedYear}</p>
          <p><b>Copies:</b> {book.availableCopies}</p>

          {/* UPDATE BUTTONS */}
          <button onClick={() => updateCopies(book._id, 1)}>➕</button>
          <button
            onClick={() => updateCopies(book._id, -1)}
            disabled={book.availableCopies === 0}
          >
            ➖
          </button>

          {/* DELETE BUTTON */}
          {book.availableCopies === 0 && (
            <button
              onClick={() => deleteBook(book._id)}
              style={{ background: "red", color: "white", marginLeft: 10 }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default BookList;