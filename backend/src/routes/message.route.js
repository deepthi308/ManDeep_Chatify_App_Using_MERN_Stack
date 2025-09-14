import express from "express";

const Router = express.Router();

Router.get("/send", (req, res) => {
  res.status(200).json({
    message: "Send Route",
  });
});

export default Router;
