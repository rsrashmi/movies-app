import axios from "axios";
import type { Entry, NewEntry } from "../types/entry";

const API = axios.create({
  baseURL: "https://movies-app-backend.onrender.com",
  withCredentials: true,
});

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
    data: data,
    total: data.length,
  };
};

export const createEntry = async (entry: NewEntry) => {
  const { data } = await API.post("/entries", entry);
  return data;
};

export const uploadPoster = async (file: File) => {
  const form = new FormData();
  form.append("poster", file);
  const { data } = await API.post("/entries/upload", form);
  return data.imageUrl;
};

export const deleteEntry = async (id: number): Promise<void> => {
  await API.delete(`/entries/${id}`, {
    method: "DELETE",
  });
};

export async function updateEntry(
  id: number,
  updated: Partial<Entry>
): Promise<Entry> {
  const { data } = await API.put(`/entries/${id}`, updated);
  return data;
}
