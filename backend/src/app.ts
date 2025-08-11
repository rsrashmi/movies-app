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
];

const app = express();

// CORS middleware BEFORE any routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle OPTIONS for all routes
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/entries", entryRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
