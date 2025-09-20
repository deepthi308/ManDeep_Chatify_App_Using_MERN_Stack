import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

// Made ready for the deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}...`);
  connectDB();
});
