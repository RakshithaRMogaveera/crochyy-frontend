import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ViewUser() {
  const [users, setUsers] = useState([]);

  // ✅ FETCH USERS (FIXED useEffect)
  useEffect(() => {
    axios.get("http://localhost:7000/user/getuser")
      .then((res) => {
        setUsers(res.data.allusers);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ✅ DELETE USER (FIXED + UI UPDATE)
  const handleDelete = (uid) => {
    axios.delete(`http://localhost:7000/user/deleteuser/${uid}`)
      .then(() => {
        alert("User deleted");

        // remove from UI instantly
        setUsers(users.filter((user) => user._id !== uid));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "#fff" }}>SL.No</TableCell>
            <TableCell sx={{ color: "#fff" }}>Name</TableCell>
            <TableCell sx={{ color: "#fff" }}>Email</TableCell>
            <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
            <TableCell sx={{ color: "#fff" }}>Address</TableCell>
            <TableCell sx={{ color: "#fff" }}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((row, index) => (
            <TableRow key={row._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>

              <TableCell>
                <Tooltip title="Edit">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>

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