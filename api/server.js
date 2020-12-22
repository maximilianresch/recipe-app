const express = require("express");
const db = require("./db");
var cors = require("cors");
var jwt = require("jsonwebtoken");
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(cors());

const JWT_KEY = "app-key";

app.post("/register", async (req, res) => {
  const body = req.body;
  console.log("body", req.body);

  const userWithEmail = await db.User.findOne({
    email: body.email,
  });
  if (userWithEmail) {
    res.json({
      success: false,
      message: "E-mail is already used",
    });
    return;
  }
  const savedUser = await db.User.create(req.body);
  var token = jwt.sign({ id: savedUser._id }, JWT_KEY);
  res.json({
    success: true,
    token: token,
  });
});

app.post("/login", async (req, res) => {
  const body = req.body;
  console.log("body", req.body);

  const currentUser = await db.User.findOne({
    email: body.email,
    password: body.password,
  });

  if (currentUser) {
    currentUser._id;
    var token = jwt.sign({ id: currentUser._id }, JWT_KEY);
    res.json({
      success: true,
      token: token,
    });
  } else {
    res.json({
      success: false,
      error: "email oder passwort falsch",
    });
  }
});

app.post("/recipe", async (req, res) => {
  const body = req.body;

  const currentRecipe = await db.Recipe.create({
    title: body.title,
    guide: body.guide,
    ingredients: body.ingredients,
    name: body.name,
    amount: body.amount,
  });

  res.json({
    success: true,
    message: "recipe gespeichert",
  });
  console.log("body", req.body);
  console.log("user", user);
});

app.get("/me", async (req, res) => {
  const user = await getAuthUser(req, res);

  res.json({ success: true, user });
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

async function getAuthUser(req) {
  const token = req.headers.authorization;
  console.log("token", token);

  const jwtPayload = jwt.verify(token, JWT_KEY);
  const userId = jwtPayload.id;

  const user = await db.User.findById(userId);

  console.log("user", user);

  if (!user) {
    throw new Error("user not found");
  }

  return user;
}