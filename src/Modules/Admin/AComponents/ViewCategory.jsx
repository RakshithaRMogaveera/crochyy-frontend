import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);

  // ✅ FETCH
  useEffect(() => {
    axios.get('http://localhost:7000/category/getcategory')
      .then((res) => {
        setCategories(res.data.allcategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ✅ DELETE + UI UPDATE
  const handleDelete = (id) => {
    axios.delete(`http://localhost:7000/category/deletecategory/${id}`)
      .then(() => {
        alert("Category deleted");

        // remove from UI instantly
        setCategories(categories.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        
        {/* HEADER */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "#fff" }} align="center">SL.No</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">Category Name</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">Category Description</TableCell>
            <TableCell sx={{ color: "#fff" }} align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {categories.map((row, index) => (
            <TableRow key={row._id}>
              
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.category_name}</TableCell>
              <TableCell align="center">{row.category_description}</TableCell>

              <TableCell align="center">
                
                {/* EDIT */}
                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    component={Link}
                    to={`/Admin/UpdateCategory/${row._id}`}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {/* DELETE */}
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}