import React from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'   // ✅ ADD THIS

export default function Login() {

  const navigate = useNavigate()   // ✅ ADD THIS

  const [login, setLogindata] = React.useState({
    email:'',
    password:''
  })

  const handlechange =(e)=>{
    setLogindata({...login, [e.target.name]:e.target.value})
  }

  const handleLogin = () =>{
    console.log("login data:", login)

    axios.post("https://crochyy-backend.onrender.com/user/Login", login)
    .then((res)=>{
      console.log("login response:", res.data)

      if (res.data.success) {
        localStorage.setItem("UserToken",res.data.token)
        alert("Login successful")

        navigate("/home")   // ✅ redirect after login (optional but useful)
      } else {
        alert("Invalid credentials")
      }
    })
    .catch((error)=>{
      console.log(error)
      alert("unsuccessful")
    })
  }
  

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f7fb"
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: 380,
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff"
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: "#111827" }}>
          Welcome back
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "#6b7280" }}>
          Please enter your details to login
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          onChange={handlechange}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          onChange={handlechange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "#111827",
            '&:hover': { backgroundColor: "#1f2937" }
          }}
          onClick={handleLogin}
        >
          Sign in
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#6b7280" }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}   // ✅ THIS FIXES YOUR ISSUE
            style={{
              color:"#111827",
              fontWeight:500,
              cursor:"pointer"
            }}
          >
            <u>Register</u>
          </span>
        </Typography>

      </Paper>
    </Box>
  )
}