const path = require("path");
const express = require("express"); //to import express
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); //to access and handle mongoDb
const postsRoutes = require("../routes/posts");
const usersRoutes = require("../routes/user");

const app = express();

/*********************  my mongodb atlas connection link***************** */
mongoose
  .connect(
    "mongodb+srv://angblog:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-wepoo.mongodb.net/angblog"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", usersRoutes);

module.exports = app;
