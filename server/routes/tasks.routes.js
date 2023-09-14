const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/isAdmin");
const {
  allTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
router.get("/", allTasks);

router.post("/", isAdmin, addTask);

router.put("/:id", isAdmin, updateTask);

router.delete("/:id", isAdmin, deleteTask);

module.exports = router;
