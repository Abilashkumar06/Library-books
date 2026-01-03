import API from "../services/api";

function UpdateBook({ book, refresh }) {
  const updateCopies = async amount => {
    await API.put(`/copies/${book._id}`, { amount });
    refresh();
  };

  return (
    <div>
      <button onClick={() => updateCopies(1)}>+</button>
      <button onClick={() => updateCopies(-1)}>-</button>
    </div>
  );
}

export default UpdateBook;
