const tasksServices = require("../services/tasks.service");

module.exports.allTasks = async (req, res) => {
  try {
    let [data] = await tasksServices.allTasks();
    res.status(200).json(data);
  } catch (error) {
    res.json(error);
  }
};
module.exports.addTask = async (req, res) => {
  const { name, status } = req.body;
  try {
    await tasksServices.addTask(name, status);
    res.status(201).json({
      message: "Add new task successfully",
      status: "success",
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    await tasksServices.updateTask(id);
    res.status(200).json({
      message: "Update task successfully",
      status: "success",
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await tasksServices.deleteTask(id);
    res.status(200).json({
      message: "Delete task successfully",
    });
  } catch (error) {
    res.json(error);
  }
};
