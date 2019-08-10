const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan")

mongoose.connect("mongodb://localhost/my-blog",  { useNewUrlParser: true });
mongoose.Promise = Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));


app.use("/api/users", require("./Router/userRoute"));
app.use("/api/blogs", require("./Router/blogsRoute"));


app.get("/", (req, res) => {
  res.status(200).send();
});





module.exports = app;
