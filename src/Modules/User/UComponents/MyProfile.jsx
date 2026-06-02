import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

export default function MyProfile() {
  const navigate = useNavigate();
  const[formdata,setFormdata] = useState({
    name:'',
    email:'',
    phone:'',
    address:''
  })

  const handlechange = (e)=>{
    console.log({...formdata,[e.target.name]: e.target.value})
    setFormdata({...formdata,[e.target.name]: e.target.value})
  }

  const token = localStorage.getItem("UserToken")
  console.log("User token details", token)
    // const existingusers = JSON.parse(localStorage.getItem('userdetails')) || [];
    // console.log(existingusers)
    // const allusers= [...existingusers,formdata]

    // localStorage.setItem('userdetails',JSON.stringify(allusers))
    // alert('registered successfully!!!')
    // navigate('/ULogin');
     const ViewProfile = async (req,res)=>{
       try {
        const response = await fetch("http://localhost:7000/user/myprofile",{method:"GET", headers:{"auth-token":token}})
        const details = await response.json()
        console.log( details)
        setFormdata(details.udata)
       } catch (error) {
        console.log(error)
       }
    }
  useEffect(()=>{
   
    ViewProfile()
  },[])

  const handleprofile = async()=>{
try{
const response = await fetch("http://localhost:7000/user/updateprofile",{method:"PUT",body:JSON.stringify(formdata),headers:{"Content-Type":"application/json","auth-token":token}})
const details = await response.json()
alert("updated successfully!!!")
}
catch(error){
  console.log(error)
}
  }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <Paper elevation={3} style={{width:'550px', padding:'20px'}}>
      <Typography variant='h4' style={{fontFamily:'times new roman',textAlign:'center'}}>PROFILE</Typography>
      <TextField id="outlined" type='text' label="Name" name='name' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange} value={formdata.name}/>
      <TextField id="outlined" type='email' label="Email" name='email' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange} value={formdata.email}/>
      <TextField id="outlined" type='number' label="phone" name='phone' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange} value={formdata.phone}/>
      <TextField id="outlined" multiline rows={5} label="Address"name='address' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange} value={formdata.address}/>
      <Button variant="contained" color='primary' fullWidth onClick={handleprofile}>
        Update
      </Button>
      </Paper>
    </div>
  )
}