const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
dotenv.config();

const tasksRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/todo", tasksRoutes);
app.use("/auth", authRoutes);
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
