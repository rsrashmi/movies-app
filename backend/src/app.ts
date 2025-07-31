import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import entryRoutes from "./routes/entry.routes";
import path from "path";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/entries", entryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
export default app;
