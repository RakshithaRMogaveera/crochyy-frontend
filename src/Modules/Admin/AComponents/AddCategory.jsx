import React, { useState } from "react";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Box
} from "@mui/material";
import axios from "axios";

export default function AddCategory() {

  const [formdata, setFormdata] = useState({
    category_name: "",
    category_description: ""
  });

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleaddcategory = () => {
    if (!formdata.category_name || !formdata.category_description) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:7000/category/addcategory", formdata)
      .then(() => {
        alert("Category Added Successfully");

        // ✅ CLEAR FORM
        setFormdata({
          category_name: "",
          category_description: ""
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5   // 👈 FIX top spacing (no overlap)
      }}
    >

      <Paper
        elevation={3}
        sx={{
          width: 500,
          p: 3,
          borderRadius: 3
        }}
      >

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1976d2",
            mb: 3
          }}
        >
          Add Category
        </Typography>

        <TextField
          label="Category Name"
          name="category_name"
          value={formdata.category_name}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handlechange}
        />

        <TextField
          label="Category Description"
          name="category_description"
          value={formdata.category_description}
          multiline
          rows={4}
          fullWidth
          sx={{ mb: 3 }}
          onChange={handlechange}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.2,
            fontWeight: "bold"
          }}
          onClick={handleaddcategory}
        >
          Add Category
        </Button>

      </Paper>
    </Box>
  );
}