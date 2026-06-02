import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CategoryBar from "./CategoryBar";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";

export default function Clothing() {

  const navigate = useNavigate();

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    
  } = useContext(StoreContext);

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:7000/product/getproducts"
      );

      setProducts(
        res.data.products.filter(
          (p) => p.category === "yarn"
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (value) => {

    setSort(value);

    let sorted = [...products];

    if (value === "low") {
      sorted.sort((a, b) => a.productprice - b.productprice);
    }

    else if (value === "high") {
      sorted.sort((a, b) => b.productprice - a.productprice);
    }

    setProducts(sorted);
  };

  const handleWishlist = (product) => {

    const exists = wishlist.find(
      (item) => item._id === product._id
    );

    if (exists) {
      removeFromWishlist(product._id);
    }

    else {
      addToWishlist(product);
    }
  };

  return (

    <Box>

      <CategoryBar />

      <Box sx={{ p: 3 }}>

        {/* TITLE + SORT */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2
          }}
        >

          <Typography
            variant="h5"
            sx={{
              color: "#c2185b",
              fontWeight: 700
            }}
          >
            Yarn
          </Typography>

          <Select
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
            size="small"
          >
            <MenuItem value="default">
              Popularity
            </MenuItem>

            <MenuItem value="low">
              Price: Low to High
            </MenuItem>

            <MenuItem value="high">
              Price: High to Low
            </MenuItem>

          </Select>

        </Box>

        {/* GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: 4
          }}
        >

          {products.map((p) => {

            const isWishlisted = wishlist.find(
              (item) => item._id === p._id
            );

            const originalPrice =
              Number(p.productprice) + 1500;

            const discount = Math.round(
              (
                (originalPrice - p.productprice)
                / originalPrice
              ) * 100
            );

            return (

              <Box
                key={p._id}
                sx={{
                  borderRadius: "25px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid #f8bbd0",
                  transition: "0.3s",

                  "&:hover": {
                    transform: "translateY(-8px)"
                  }
                }}
              >

                {/* IMAGE SECTION */}
                <Box
                  sx={{
                    position: "relative",
                    p: 2
                  }}
                >

                  <img
                    src={
                      p.productimage?.includes("-")
                        ? `http://localhost:7000/Uploads/${p.productimage}`
                        : `/images/${p.productimage}`
                    }

                    alt={p.productname}

                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "18px"
                    }}
                  />

                  {/* OFFER */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 20,
                      bottom: 20,
                      backgroundColor: "#1db954",
                      color: "#fff",
                      px: 2,
                      py: 0.5,
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "22px"
                    }}
                  >
                    {discount}% off
                  </Box>

                  {/* HEART */}
                  <IconButton
                    onClick={() => handleWishlist(p)}
                    sx={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      backgroundColor: "#ffffffd9"
                    }}
                  >

                    {isWishlisted ? (
                      <FavoriteIcon sx={{ color: "#e91e63" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}

                  </IconButton>

                  {/* CART */}
                  <IconButton
                    onClick={() => {

                      addToCart({
                        ...p,
                        price: p.productprice
                      });

                      navigate("/cart");
                    }}

                    sx={{
                      position: "absolute",
                      right: 20,
                      bottom: 20,
                      backgroundColor: "#ec4899",
                      color: "#fff",

                      "&:hover": {
                        backgroundColor: "#db2777"
                      }
                    }}
                  >
                    <ShoppingBagIcon />
                  </IconButton>

                </Box>

                {/* DETAILS */}
                <Box sx={{ p: 3 }}>

                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ad1457"
                    }}
                  >
                    {p.productname}
                  </Typography>

                  {/* PRICE */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1
                    }}
                  >

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "28px",
                        color: "#e91e63"
                      }}
                    >
                      ₹{p.productprice}
                    </Typography>

                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        color: "#888",
                        fontSize: "22px"
                      }}
                    >
                      ₹{originalPrice}
                    </Typography>

                  </Box>

                  {/* BUTTON */}
                  <Box
                    sx={{
                      display: "flex",
                      mt: 3
                    }}
                  >

                    <Button
  fullWidth
  variant="outlined"

  sx={{
    borderRadius: "12px",
    fontWeight: 700,
    borderColor: "#ec4899",
    color: "#ec4899"
  }}

  onClick={() => {

    addToCart({

      ...p,

      qty: 1,

      productimage:
        p.productimage,

      image:
        p.productimage,

      productname:
        p.productname,

      productprice:
        p.productprice
    });

    navigate("/cart");
  }}
>
  Buy Now
</Button>

                  </Box>

                </Box>

              </Box>

            );
          })}

        </Box>

      </Box>

    </Box>
  );
}