import { useState } from "react";
import API from "../services/api";

function AddBook({ refresh }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/", book);
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="author" placeholder="Author" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="publishedYear" placeholder="Year" type="number" onChange={handleChange} />
      <input name="availableCopies" placeholder="Copies" type="number" onChange={handleChange} />
      <button>Add</button>
    </form>
  );
}

export default AddBook;
