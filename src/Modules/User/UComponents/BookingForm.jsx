import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookingForm() {

  const { productId } = useParams()

  const [booking, setBooking] = useState({
    fname: '',
    email: '',
    phone: '',
    address: '',
    quantity: ''
  })

  const handlechange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value })
  }

  const handlebooking = async () => {
    try {

      // 🔍 DEBUG
      console.log("DATA SENDING 👉", { ...booking, productId })

      await axios.post(
        "http://localhost:7000/booking/createbooking", // ✅ FIXED
        { 
          ...booking, 
          quantity: Number(booking.quantity), // ✅ FIXED
          productId,
               price: 500 // 👈 ADD THIS

        }
      );

      alert("Order placed successfully!")

    } catch (error) {
      console.log("FRONTEND ERROR 👉", error)
      alert("Booking failed")
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f7fa'
    }}>
      
      <Box sx={{
        maxWidth: 600,
        width: '100%',
        p: 4,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: 'white'
      }}>

        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#1565c0' }}
        >
          Place Order
        </Typography>

        <TextField 
          label="Full Name" 
          name="fname" 
          fullWidth 
          margin="normal"
          onChange={handlechange}
        />

        <TextField 
          label="Email" 
          name="email" 
          fullWidth 
          margin="normal"
          onChange={handlechange}
        />

        <TextField 
          type="number" 
          label="Phone" 
          name="phone" 
          fullWidth 
          margin="normal"
          onChange={handlechange}
        />

        <TextField 
          label="Address" 
          name="address" 
          multiline 
          rows={3} 
          fullWidth 
          margin="normal"
          onChange={handlechange}
        />

        <TextField 
          type="number" 
          label="Quantity" 
          name="quantity" 
          fullWidth 
          margin="normal"
          onChange={handlechange}
        />

        <Button 
          fullWidth 
          variant="contained" 
          onClick={handlebooking}
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#1565c0',
            '&:hover': {
              backgroundColor: '#0d47a1'
            }
          }}
        >
          Book Now
        </Button>

      </Box>
    </div>
  )
}