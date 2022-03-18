import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { config } from "./shared/config";
import passport from "passport";
import cookieSession from "cookie-session";
const router = require("./routers");

require("./controllers/googlePassport");

mongoose
  .connect(config.mongodb.host, { keepAlive: true, dbName: config.mongodb.dbName })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS, PUT");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello there!");
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});
app.get("/success", (req, res) => {
    console.log(req.user);
  res.send(`Welcome ${req.user}`);
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.use("/api", router);

export default app;
