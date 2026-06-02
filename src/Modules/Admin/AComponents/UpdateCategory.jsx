import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function UpdateCategory() {
  const [categorydata,setCategorydata] = useState({
    category_name:'',
    category_description:''
    
  })

  const{rowid} = useParams();
  const handlechange =(e)=>{
    console.log({...categorydata, [e.target.name]:e.target.value})
     setCategorydata({...categorydata, [e.target.name]:e.target.value})

  }
   useEffect(()=>{
     axios.get(`http://localhost:7000/category/getcategorybyid/${rowid}`,categorydata)
    .then((res)=>{
     console.log(res.data.byid)
     setCategorydata(res.data.byid)
    })
    .catch((error)=>{
    console.log(error)
    })
    
    
   },[])

//   const handleregister =()=>{
//   console.log("form details:",categorydata)
//   axios.post("http://localhost:7000/category/addcategory",categorydata)
//   .then((res)=>{
//    console.log("registered user:" ,res.data)
//   //  alert("registered successfully")
//    alert(res.data.message)
//   })
//   .catch((error)=>{
//    console.log(error)
//   })

//   }
const handleupdate = async ()=>{
  


  try {
      axios.put(`http://localhost:7000/category/updatecategory/${rowid}`, categorydata)
    alert('category updated')
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  background: "linear-gradient(to right, #e3f2fd, #ffffff)"
}}>
  <Paper elevation={10} style={{
    width: "500px",
    padding: "30px",
    borderRadius: "15px"
  }}>
    
    <Typography 
      variant='h4' 
      align='center' 
      style={{
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#08294b"
      }}
    >
      Update Category
    </Typography>

    <TextField
      variant='outlined'
      label='Category Name'
      name='category_name'
      fullWidth
      value={categorydata.category_name}
      onChange={handlechange}
      sx={{ mb: 2 }}
    />

    <TextField
      variant='outlined'
      multiline
      rows={4}
      label='Category Description'
      name='category_description'
      fullWidth
      value={categorydata.category_description}
      onChange={handlechange}
      sx={{ mb: 3 }}
    />

    <Button 
      variant='contained' 
      fullWidth 
      onClick={handleupdate}
      sx={{
        padding: "10px",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "10px",
        background: "linear-gradient(to right, #08294b, #42a5f5)"
      }}
    >
      Update Category
    </Button>

  </Paper>
</div>
  )
}