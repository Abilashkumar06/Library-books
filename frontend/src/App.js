import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import API from "./services/api";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await API.get("/");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <AddBook refresh={fetchBooks} />
      <BookList books={books} refresh={fetchBooks} />
    </div>
  );
}

export default App;
