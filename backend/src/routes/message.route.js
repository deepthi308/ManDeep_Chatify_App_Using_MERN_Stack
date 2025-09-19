import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const Router = express.Router();

Router.use(arcjetProtection, protectRoute);

Router.get("/contacts", getAllContacts);
Router.get("/chats", getChatPartners);
Router.get("/:id", getMessagesByUserId);
Router.post("/send/:id", sendMessage);
export default Router;
