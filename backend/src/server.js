import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

// Made ready for the deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}...`);
  connectDB();
});
