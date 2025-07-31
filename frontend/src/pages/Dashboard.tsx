import { Container, Typography, Button } from "@mui/material";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import { useState, useEffect } from "react";
import type { Entry } from "../types/entry";
import { deleteEntry, fetchEntries, updateEntry } from "../services/entry";

export default function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const loadEntries = async () => {
    const res = await fetchEntries(page + 1, "", "", rowsPerPage);
    setEntries(res.data);
    setTotal(res.total);
  };
  useEffect(() => {
    if (showTable) {
      loadEntries();
    }
  }, [showTable, page]);

  const handleAdd = async (newEntry: Entry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete the entry from server.");
    }
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
  };
  const handleUpdate = async (updatedEntry: Entry) => {
    try {
      const res = await updateEntry(updatedEntry.id, updatedEntry);
      setEntries((prev) =>
        prev.map((e) => (e.id === updatedEntry.id ? res : e))
      );
      setEditingEntry(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  return (
    <Container sx={{ py: 4, mt: { xs: 10, sm: 12 } }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Add Movies & TV Shows
      </Typography>

      <EntryForm
        onAdd={handleAdd}
        editingEntry={editingEntry}
        onUpdate={handleUpdate}
      />

      <Button
        variant="outlined"
        onClick={() => setShowTable(!showTable)}
        sx={{ mb: 2 }}
      >
        {showTable ? "Hide Data" : "Show Data"}
      </Button>

      {showTable && (
        <EntryList
          entries={entries}
          onDelete={handleDelete}
          onEdit={handleEdit}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          total={total}
        />
      )}
    </Container>
  );
}
