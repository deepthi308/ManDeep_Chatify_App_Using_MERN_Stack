import express from "express";

const Router = express.Router();

Router.get("/signup", (req, res) => {
  res.status(200).json({
    message: "Sign Up Route",
  });
});

Router.get("/signin", (req, res) => {
  res.status(200).json({
    message: "Sign In Route",
  });
});

Router.get("/signout", (req, res) => {
  res.status(200).json({
    message: "Sign Out Route",
  });
});

export default Router;
