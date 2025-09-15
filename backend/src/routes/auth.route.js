import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const Router = express.Router();

Router.get("/signup", signUp);

Router.get("/signin", signIn);

Router.get("/signout", signOut);

export default Router;
