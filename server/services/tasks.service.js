const db = require("../utils/database");

module.exports.allTasks = () => {
  return db.execute("SELECT * FROM tasks");
};

module.exports.addTask = (name, status) => {
  return db.execute("INSERT INTO tasks(name,status) VALUES(?,?)", [
    name,
    status,
  ]);
};

module.exports.updateTask = (id) => {
  return db.execute("UPDATE tasks SET status=1 WHERE task_id=?", [id]);
};

module.exports.deleteTask = (id) => {
  return db.execute("DELETE FROM tasks where task_id=?", [id]);
};
