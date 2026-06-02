import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function UPregister() {
  const navigate = useNavigate();
  const[productdata,setProductdata] = useState({     
    productname:'',
    productprice:'',
    pquantity:'',
    pdescription:''
  })

  const handlechange = (e)=>{
    console.log({...productdata,[e.target.name]: e.target.value})
    setProductdata({...productdata,[e.target.name]: e.target.value})
  }

  const handleregister=()=>{
 console.log("productdata:", productdata)
axios.post('http://localhost:7000/product/addproduct', productdata)
.then((res)=>{
  console.log("registered product", res.data)
})
.catch((error)=>{
  console.error("Error registering product:", error)
})

    // const existingusers = JSON.parse(localStorage.getItem('userdetails')) || [];
    // console.log(existingusers)
    // const allusers= [...existingusers,formdata]

    // localStorage.setItem('userdetails',JSON.stringify(allusers))
    // alert('registered successfully!!!')
    // navigate('/ULogin');
  }
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <Paper elevation={3} style={{width:'550px', padding:'20px'}}>
      <Typography variant='h4' style={{fontFamily:'times new roman',textAlign:'center'}}>REGISTER PAGE</Typography>
      <TextField id="outlined" type='text' label="Product Name" name='productname' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange}/>
      <TextField id="outlined" type='number' label="Product Price" name='productprice' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange}/>
      <TextField id="outlined" type='number' label="Quantity" name='pquantity' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange}/>
      <TextField id="outlined" multiline rows={5} label="Description" name='pdescription' variant="outlined" fullWidth style={{marginBottom:'10px'}} onChange={handlechange}/>
      <Button variant="contained" onClick={handleregister} color='primary' fullWidth>Register</Button>
      </Paper>
    </div>
  )
}