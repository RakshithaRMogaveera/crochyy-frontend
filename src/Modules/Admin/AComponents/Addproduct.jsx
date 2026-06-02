import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from "@mui/material";
import axios from "axios";

export default function Addproudct() {

  const [productdata, setProductdata] = useState({
    productname: "",
    productprice: "",
    pquantity: "",
    pdescription: "",
    categoryId: "",
    productimage: null
  });

  const [category, setCategory] = useState([]);

  // ✅ FETCH CATEGORY
  useEffect(() => {
    axios.get("http://localhost:7000/category/getcategory")
      .then((res) => {
        setCategory(res.data.allcategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ✅ HANDLE CHANGE
  const handlechange = (e) => {
    if (e.target.name === "productimage") {
      setProductdata({
        ...productdata,
        productimage: e.target.files[0]
      });
    } else {
      setProductdata({
        ...productdata,
        [e.target.name]: e.target.value
      });
    }
  };

  // ✅ ADD PRODUCT (FIXED FORM DATA)
  const handleregister = () => {
    const {
      productname,
      productprice,
      pquantity,
      pdescription,
      categoryId,
      productimage
    } = productdata;

    if (!productname || !productprice || !pquantity || !categoryId || !productimage) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("pquantity", pquantity);
    formData.append("pdescription", pdescription);
    formData.append("category", categoryId);
   formData.append("productimage", productimage);

    axios.post("http://localhost:7000/product/addproduct", formData)
      .then((res) => {
        alert(res.data.message);

        // ✅ CLEAR FORM
        setProductdata({
          productname: "",
          productprice: "",
          pquantity: "",
          pdescription: "",
          categoryId: "",
          productimage: null
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      
      <Paper sx={{ width: 500, p: 3, borderRadius: 3 }} elevation={3}>
        
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1976d2",
            mb: 3
          }}
        >
          Add Product
        </Typography>

        <TextField
          label="Name"
          name="productname"
          value={productdata.productname}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
        />

        <TextField
          label="Price"
          name="productprice"
          type="number"
          value={productdata.productprice}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
        />

        <TextField
          label="Quantity"
          name="pquantity"
          type="number"
          value={productdata.pquantity}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
        />

        <TextField
          label="Description"
          name="pdescription"
          multiline
          rows={4}
          value={productdata.pdescription}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
        />

        <TextField
          type="file"
          name="productimage"
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={productdata.categoryId}
            label="Category"
            onChange={handlechange}
          >
            {category.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.category_name || cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          sx={{ py: 1.2, fontWeight: "bold" }}
          onClick={handleregister}
        >
          Add Product
        </Button>

      </Paper>

    </Box>
  );
}