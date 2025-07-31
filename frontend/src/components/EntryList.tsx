import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Entry } from "../types/entry";
import { useMemo, useState } from "react";

type Props = {
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (id: number) => void;
};

export default function EntryList({
  entries,
  onEdit,
  onDelete,
  total,
  page,
  rowsPerPage,
  onPageChange,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEntries = useMemo((): Entry[] => {
    return entries.filter((entry) => {
      const search = searchTerm.toLowerCase();
      return (
        entry.title.toLowerCase().includes(search) ||
        entry.type.toLowerCase().includes(search) ||
        entry.location.toLowerCase().includes(search) ||
        entry.budget.toString().toLowerCase().includes(search)
      );
    });
  }, [entries, searchTerm]);
  const handleDeleteClick = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmed) {
      onDelete(id);
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        mt: 4,
        border: "1px solid black",
      }}
    >
      <Box sx={{ px: 2, py: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search by Title, Type, Location or Budget"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#e0e0e0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Poster
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Director
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Budget
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Location
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Duration
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Year/Time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {entry.poster && (
                    <img
                      src={`https://movies-app-backend.onrender.com${entry.poster}`}
                      alt={entry.title}
                      style={{ height: "60px", borderRadius: "4px" }}
                    />
                  )}
                </TableCell>
                <TableCell>{entry.title}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.director}</TableCell>
                <TableCell>{entry.budget}</TableCell>
                <TableCell>{entry.location}</TableCell>
                <TableCell>{entry.duration}</TableCell>
                <TableCell>{entry.yearTime}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(entry)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(entry.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}
