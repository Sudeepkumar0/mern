const express = require("express");
const router = express.Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// GET all items
router.get("/", getItems);

// ADD new item
router.post("/", addItem);

// UPDATE item
router.put("/:id", updateItem);

// DELETE item
router.delete("/:id", deleteItem);

module.exports = router;
