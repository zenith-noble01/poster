import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import morgan from "morgan";
import dotenv from "dotenv";
import conversationRoute from "./routes/conversationRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";
import messageRoute from "./routes/messageRoute.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

//middlewares
app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// routes
app.use("/api/conversation", conversationRoute);
app.use("/api/auth", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/message", messageRoute);

connectDb();

const port = 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));
