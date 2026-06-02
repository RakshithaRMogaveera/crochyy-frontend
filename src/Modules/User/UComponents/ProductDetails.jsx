import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Box, Typography, Button, Chip } from '@mui/material'

export default function ProductDetails() {

  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:7000/product/getproduct/${id}`)
      .then((res) => {
        setProduct(res.data.product)
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!product) return <h2>Loading...</h2>

  return (
    <Box sx={{ padding: "40px" }}>

      <Box
        sx={{
          display: "flex",
          gap: "50px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        {/* LEFT - IMAGE */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            src={`http://localhost:7000/image/${product.productimage}`}
            alt=""
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          />
        </Box>

        {/* RIGHT - DETAILS */}
        <Box sx={{ flex: 1 }}>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.productname}
          </Typography>

          <Typography
            variant="h5"
            sx={{ color: "#1976d2", marginBottom: "10px" }}
          >
            ₹{product.productprice}
          </Typography>

          <Chip
            label={
              product.pquantity > 0 ? "In Stock" : "Out of Stock"
            }
            color={product.pquantity > 0 ? "success" : "error"}
            sx={{ marginBottom: "15px" }}
          />

          <Typography
            variant="body1"
            sx={{ color: "#555", marginBottom: "20px" }}
          >
            {product.pdescription}
          </Typography>

          {/* BUTTONS */}
          <Box sx={{ display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
            >
              Buy Now
            </Button>
          </Box>

        </Box>

      </Box>
    </Box>
  )
}