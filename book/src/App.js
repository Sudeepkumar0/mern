import React, { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem("books")) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Create or Update
  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editId) {
      // Update existing book
      setBooks(
        books.map((b) => (b.id === editId ? { ...b, title, author, price } : b))
      );
      setEditId(null);
    } else {
      // Create new book
      setBooks([...books, { id: Date.now(), title, author, price }]);
    }

    setTitle("");
    setAuthor("");
    setPrice("");
  };

  // Delete
  const handleDelete = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  // Edit (populate form)
  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setEditId(book.id);
  };

  // Cancel edit
  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setPrice("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Book Management (CRUD)</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: "10px", padding: "5px", width: "100px" }}
        />
        <button onClick={handleSubmit} style={{ padding: "5px 15px" }}>
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            onClick={handleCancel}
            style={{ padding: "5px 15px", marginLeft: "5px" }}
          >
            Cancel
          </button>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.map((b) => (
          <li
            key={b.id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{b.title}</strong>
              {b.author && <span> by {b.author}</span>}
              {b.price && <span> - ₹{b.price}</span>}
            </div>
            <div>
              <button
                onClick={() => handleEdit(b)}
                style={{ marginRight: "5px", padding: "3px 10px" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                style={{
                  padding: "3px 10px",
                  backgroundColor: "#ff4444",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
