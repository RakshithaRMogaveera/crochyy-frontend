import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    // ADMIN CREDENTIALS
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      alert("✅ Admin Login Successful");

      navigate("/admin");

    } else {

      alert(
        "❌ Invalid Admin Email or Password"
      );
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
  "linear-gradient(to right,#dbeafe,#f0f9ff)"
      }}
    >

      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: "420px",
          p: 5,
          borderRadius: "20px"
        }}
      >

        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#2318c2",
            textAlign: "center",
            mb: 4
          }}
        >
          Admin Login
        </Typography>

        {/* EMAIL */}
        <TextField
          label="Admin Email"
          fullWidth
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          sx={{ mb: 3 }}
        />

        {/* PASSWORD */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          sx={{ mb: 4 }}
        />

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}

          sx={{
            backgroundColor: "#1a3e8a",
            py: 1.5,
            fontSize: "17px",
            fontWeight: 700,

            "&:hover": {
              backgroundColor: "#4e92e0"
            }
          }}
        >
          LOGIN
        </Button>

      </Paper>

    </Box>
  );
}