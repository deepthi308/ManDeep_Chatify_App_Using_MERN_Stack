import express from "express";
import {
  signIn,
  signOut,
  signUp,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const Router = express.Router();

// Router.use(arcjetProtection);

Router.get("/test", (_, res) => {
  return res.status(200).json({
    message: "Test Route",
  });
});

Router.post("/signup", signUp);

Router.post("/signin", signIn);

Router.post("/signout", signOut);

Router.put("/update-profile", protectRoute, updateProfile);

Router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);

export default Router;
