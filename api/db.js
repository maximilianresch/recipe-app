const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/recipe-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  })
);

const Recipe = mongoose.model(
  "recipe",
  new mongoose.Schema({
    title: String,
    guide: String,
    ingredients: [{ name: String, amount: String, measure: String }],
    userId: mongoose.Schema.Types.ObjectId,
  })
);

module.exports = {
  User,
  Recipe,
};
