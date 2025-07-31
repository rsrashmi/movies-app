import express from "express";
import { upload } from "../utils/multer";
import {
  createEntry,
  deleteEntry,
  getEntriesPaginated,
  updateEntry,
} from "../controllers/entry.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { entrySchema } from "../schemas/entry.schema";

const router = express.Router();

router.post("/", requireAuth, validate(entrySchema), createEntry);
router.get("/", requireAuth, getEntriesPaginated);
router.put("/:id", requireAuth, validate(entrySchema), updateEntry);
router.delete("/:id", requireAuth, deleteEntry);
router.post("/upload", requireAuth, upload.single("poster"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});
export default router;
