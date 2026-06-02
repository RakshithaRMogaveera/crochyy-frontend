import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

import axios from "axios";

const ViewProducts = () => {

  const [products, setProducts] = useState([]);

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:7000/product/getproducts"
      );

      setProducts(res.data.products);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE PRODUCT
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:7000/product/deleteproduct/${id}`
      );

      setProducts(
        products.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <Box sx={{ width: "100%" }}>

      {/* TITLE */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1976d2"
        }}
      >
        Product Management
      </Typography>

      {/* TABLE */}
      <TableContainer
        component={Paper}

        sx={{
          borderRadius: 3,
          overflowX: "auto"
        }}
      >

        <Table>

          <TableHead>

            <TableRow
              sx={{
                backgroundColor: "#1976d2"
              }}
            >

              <TableCell sx={{ color: "#fff" }}>
                Image
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>
                Name
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>
                Price
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>
                Category
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>
                Action
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {products.length > 0 ? (

              products.map((item) => (

                <TableRow key={item._id}>

                  {/* IMAGE */}
                  <TableCell>

                    <img
                      src={
                        item.productimage?.includes("-")
                          ? `http://localhost:7000/uploads/${item.productimage}`
                          : `/images/${item.productimage}`
                      }

                      alt={item.productname}

                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #ddd"
                      }}
                    />

                  </TableCell>

                  {/* NAME */}
                  <TableCell>
                    {item.productname}
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>
                    ₹ {item.productprice}
                  </TableCell>

                  {/* CATEGORY */}
                  <TableCell>
                    {item.category}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"

                      onClick={() =>
                        handleDelete(item._id)
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell
                  colSpan={5}
                  align="center"
                >
                  No Products Found
                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>
  );
};

export default ViewProducts;