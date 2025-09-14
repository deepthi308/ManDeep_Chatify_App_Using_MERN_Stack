import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}...`);
});
