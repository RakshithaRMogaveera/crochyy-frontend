import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function URegister() {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const handleregister = () => {
    console.log("formdata:", formdata)

    axios.post("http://localhost:7000/user/registeruser", formdata)
      .then((res) => {
        console.log("registered user:", res.data)

        // ✅ SUCCESS HANDLING
        if (res.data.success) {
          alert("Registration successful 🎉")

          // redirect to login
          navigate("/login")
        } else {
          alert(res.data.message || "Registration failed")
        }
      })
      .catch((error) => {
        console.log(error)
        alert("Something went wrong")
      })
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#f5f7fb'
    }}>

      <Paper
        elevation={5}
        style={{
          width: '550px',
          padding: '30px',
          borderRadius: '12px'
        }}
      >

        <Typography
          variant='h4'
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '600'
          }}
        >
          Register
        </Typography>

        <TextField label="Name" name='name' fullWidth style={{ marginBottom: '15px' }} onChange={handlechange} />
        <TextField label="Email" name='email' fullWidth style={{ marginBottom: '15px' }} onChange={handlechange} />
        <TextField label="Password" type='password' name='password' fullWidth style={{ marginBottom: '15px' }} onChange={handlechange} />
        <TextField label="Phone" name='phone' fullWidth style={{ marginBottom: '15px' }} onChange={handlechange} />
        <TextField multiline rows={4} label="Address" name='address' fullWidth style={{ marginBottom: '20px' }} onChange={handlechange} />

        <Button
          variant="contained"
          fullWidth
          onClick={handleregister}
          style={{
            padding: '10px',
            fontWeight: '600',
            backgroundColor: '#0a1325',
            textTransform: 'none'
          }}
        >
          Register
        </Button>
<Typography
  variant="body2"
  style={{
    marginTop: "15px",
    textAlign: "center",
    color: "#6b7280"
  }}
>
  Already registered?{" "}
  <span
    onClick={() => navigate("/login")}
    style={{
      color: "#111827",
      fontWeight: 500,
      cursor: "pointer"
    }}
  >
    <u>Login</u>
  </span>
</Typography>
      </Paper>
    </div>
  )
}