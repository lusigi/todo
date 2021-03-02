const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const connUrl =
  "mongodb+srv://isadia94:brian2020@cluster0.dihwp.mongodb.net/todos?retryWrites=true&w=majority";

const PORT = 5000;

let Todo = require("./todo.models.js");
//express middleware
app.use(cors());
app.use(bodyParser.json());

// Db Connection
mongoose.connect(connUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDb connected successfully");
});

//Routes

const todoRoutes = express.Router();

app.use("/todos", todoRoutes);

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

//listen port
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
