const items = require("../models/itemModel");

// GET
const getItems = (req, res) => {
  res.json(items);
};

// POST
const addItem = (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
};

// PUT
const updateItem = (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      items[i].quantity = quantity;
      return res.json({ message: "Item updated" });
    }
  }
  res.status(404).json({ message: "Item not found" });
};

// DELETE
const deleteItem = (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    items.splice(index, 1);
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
