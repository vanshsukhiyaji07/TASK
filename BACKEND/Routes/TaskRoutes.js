const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  const task = await Task.find().sort({ createdAt: -1 });
  res.json(task);
});

router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = await Task.create({ title });
  res.status(201).json(newTask);
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.log("PUT ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Task Not Found" });
  }

  res.json({ message: "Task Has Deleted" });
});

module.exports = router;
