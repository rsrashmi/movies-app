import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import entryRoutes from "./routes/entry.routes";
import path from "path";
dotenv.config();

const allowedOrigins = [
  process.env.CLIENT_URL ?? "http://localhost:5173",
  "https://movies-app-six-kohl.vercel.app",
  "https://movies-app-git-main-rashmicoders-projects.vercel.app",
].filter((origin): origin is string => Boolean(origin));

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/entries", entryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
export default app;
