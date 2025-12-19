import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch data from Node backend
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("http://localhost:5000/items");
    const data = await res.json();
    setItems(data);
  };

  const addItem = async () => {
    await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now(),
        name,
        quantity: Number(quantity),
      }),
    });
    setName("");
    setQuantity("");
    fetchItems();
  };

  const updateItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quantity: Number(quantity),
      }),
    });
    setEditingId(null);
    setQuantity("");
    fetchItems();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setQuantity(item.quantity);
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });
    fetchItems();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Inventory Management</h2>

      <input
        placeholder="Item Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Quantity"
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity}
            {editingId === item.id ? (
              <>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="New Quantity"
                />
                <button onClick={() => updateItem(item.id)}>Save</button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setQuantity("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(item)}>Update</button>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
