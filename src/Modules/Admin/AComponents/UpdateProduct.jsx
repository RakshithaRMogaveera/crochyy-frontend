import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function UpdateProduct() {
  const [productdata, setProductdata] = useState({
    productname: '',
    productprice: '',
    pquantity: '',
    pdescription: '',
    categoryId: '',
    productimage: ''
  })

  const { rowid } = useParams(); //It is used to get values from the URL
  const handlechange = (e) => {
    console.log({ ...productdata, [e.target.name]: e.target.value })
    //  setProductdata({...productdata, [e.target.name]:e.target.value})


    if (e.target.name === 'productimage') {
      setProductdata({ ...productdata, productimage: e.target.files[0] })
    } else {
      setProductdata({ ...productdata, [e.target.name]: e.target.value })
    }
  }
  useEffect(() => {
    axios.get(`http://localhost:7000/product/getproductbyid/${rowid}`)
      .then((res) => {
        console.log(res.data.byid)
        setProductdata(res.data.byid)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [rowid])

  const [category, setCategory] = useState([])
  useEffect(() => {
    axios.get('http://localhost:7000/category/getcategory')
      .then((res) => {
        console.log(res.data.allcategory)
        setCategory(res.data.allcategory)
      })
      .catch((error) => {
        console.log(error)

      })
  }, [])

  const handleupdate = async () => {
    const catdata = new FormData()
    catdata.append('productname', productdata.productname)
    catdata.append('productprice', productdata.productprice)
    catdata.append('pquantity', productdata.pquantity)
    catdata.append('pdescription', productdata.pdescription)
    catdata.append('categoryId', productdata.categoryId)

if (productdata.productimage) {
  catdata.append('productimage', productdata.productimage)
}
    // try {
    //     await axios.put(`http://localhost:7000/product/updateproduct/${rowid}`,productdata)
    //     alert("product updated")
    // } catch (error) {
    //   console.log(error)

    // }

    try {
      await axios.put(
        `http://localhost:7000/product/updateproduct/${rowid}`,
        catdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      alert("product updated")

    } catch (error) {
      console.log(error)
      
    }

  }
  return (
    <div>
      <Paper elevation={20} style={{ width: "550px", padding: "20px", margin: "50px auto" }}>
        <Typography variant='h3' style={{ fontFamily: "poppins", textAlign: "center" }}>Update Product</Typography>
        <TextField variant='outlined' type='text' label='Name' name='productname' fullWidth style={{ marginBottom: "10px" }} onChange={handlechange} value={productdata.productname} />
        <TextField variant='outlined' type='text' label='Price' name='productprice' fullWidth style={{ marginBottom: "10px" }} onChange={handlechange} value={productdata.productprice} />
        <TextField variant='outlined' type='text' label='Quantity' name='pquantity' fullWidth style={{ marginBottom: "10px" }} onChange={handlechange} value={productdata.pquantity} />
        <TextField variant='outlined' type='file' label='Product Image' name='productimage' InputLabelProps={{ shrink: true }} fullWidth style={{ marginBottom: "10px" }} onChange={handlechange} />
        <TextField variant='outlined' multiline rows={5} label='Description' name='pdescription' fullWidth style={{ marginBottom: "10px" }} onChange={handlechange} value={productdata.pdescription} />

        <FormControl fullWidth>

          <Select
            name="categoryId"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productdata.categoryId}
            label="Age"
            onChange={handlechange}
          >
            <MenuItem>Select category</MenuItem>
            {category.map((cat) => {
              return (
                <MenuItem value={cat._id}>{cat.category_name}</MenuItem>
              )
            })}

          </Select>
        </FormControl>
        <img src={`http://localhost:7000/image/${productdata.productimage}`} alt="" />

        <Button variant='contained' fullWidth onClick={handleupdate} >Update Product</Button>
      </Paper>

    </div>
  )
}