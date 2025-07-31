import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://movies-app-backend.onrender.com/auth/register",
        form,
        { withCredentials: true }
      );
      alert("Registered successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h5" mb={2} fontWeight="bold" align="center">
            Create Account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
