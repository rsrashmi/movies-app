import axios from "axios";
import type { Entry, NewEntry } from "../types/entry";

const API_URL = import.meta.env.VITE_API_URL;

// Create a pre-configured axios instance
const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // important for cookies/auth
});

// Fetch entries with optional search, filter, and pagination
export const fetchEntries = async (
  page = 1,
  search = "",
  type = "",
  limit = 10
): Promise<{ data: Entry[]; total: number }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (search) params.append("search", search);
  if (type) params.append("type", type);

  const { data } = await API.get(`/entries?${params.toString()}`);

  return {
    data,
    total: data.length, // If backend returns total count, use that instead
  };
};

// Create a new entry
export const createEntry = async (entry: NewEntry): Promise<Entry> => {
  const { data } = await API.post("/entries", entry);
  return data;
};

// Upload poster and return full image URL
export const uploadPoster = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append("poster", file);

  const { data } = await API.post("/entries/upload", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // If backend returns relative path, prepend API_URL
  return data.imageUrl.startsWith("http")
    ? data.imageUrl
    : `${API_URL}${data.imageUrl}`;
};

// Delete an entry by ID
export const deleteEntry = async (id: number): Promise<void> => {
  await API.delete(`/entries/${id}`);
};

// Update an existing entry
export const updateEntry = async (
  id: number,
  updated: Partial<Entry>
): Promise<Entry> => {
  const { data } = await API.put(`/entries/${id}`, updated);
  return data;
};
