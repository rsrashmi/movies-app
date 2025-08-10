import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createEntry, uploadPoster } from "../services/entry";
import type { Entry, NewEntry } from "../types/entry";

type Props = {
  onAdd: (entry: Entry) => void;
  editingEntry?: Entry | null;
  onUpdate?: (entry: Entry) => void;
};

export default function EntryForm({ onAdd, editingEntry, onUpdate }: Props) {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState<NewEntry>({
    title: "",
    type: "Movie",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
    poster: "",
  });

  const [poster, setPoster] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editingEntry) {
      setForm({
        title: editingEntry.title,
        type: editingEntry.type,
        director: editingEntry.director,
        budget: editingEntry.budget,
        location: editingEntry.location,
        duration: editingEntry.duration,
        yearTime: editingEntry.yearTime,
        poster: editingEntry.poster || "",
      });

      if (editingEntry.poster) {
        // If the poster already includes http, use it directly
        const isFullUrl = editingEntry.poster.startsWith("http");
        setPreviewUrl(
          isFullUrl ? editingEntry.poster : `${API_URL}${editingEntry.poster}`
        );
      } else {
        setPreviewUrl(null);
      }
    }
  }, [editingEntry, API_URL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPoster(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = form.poster || "";
      if (poster) {
        const upload = await uploadPoster(poster);
        imageUrl = upload;
      }

      const payload: NewEntry = { ...form, poster: imageUrl };

      if (editingEntry && onUpdate) {
        onUpdate({ ...editingEntry, ...payload });
        setMessage("✅ Entry updated!");
      } else {
        const created = await createEntry(payload);
        onAdd(created);
        setMessage("✅ Entry added successfully!");
      }

      setTimeout(() => {
        setForm({
          title: "",
          type: "Movie",
          director: "",
          budget: "",
          location: "",
          duration: "",
          yearTime: "",
          poster: "",
        });
        setPoster(null);
        setPreviewUrl(null);
        setMessage("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit entry.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 2,
        mb: 5,
      }}
    >
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        select
        label="Type"
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <MenuItem value="Movie">Movie</MenuItem>
        <MenuItem value="TV Show">TV Show</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Director"
        name="director"
        value={form.director}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Budget"
        name="budget"
        value={form.budget}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Duration"
        name="duration"
        value={form.duration}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="Year/Time"
        name="yearTime"
        value={form.yearTime}
        onChange={handleChange}
        required
      />

      <Box>
        <Button variant="outlined" component="label">
          Upload Poster
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

        {previewUrl && (
          <Box mt={1}>
            {poster && <Typography variant="caption">{poster.name}</Typography>}
            <Box mt={1}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  maxHeight: "120px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box gridColumn="1 / -1">
        <Button variant="contained" type="submit">
          {editingEntry ? "Update" : "Add Entry"}
        </Button>
      </Box>

      {message && <p style={{ marginTop: "10px", color: "gray" }}>{message}</p>}
    </Box>
  );
}
