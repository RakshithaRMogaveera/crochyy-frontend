import React, { useContext, useState } from "react";

import {
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Select
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
export default function Wishlist() {

  const {
    wishlist,
    removeFromWishlist,
    addToCart
  } = useContext(StoreContext);
const navigate = useNavigate();

  const [sizes, setSizes] = useState({});
  return (

    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#edfbff",
        minHeight: "100vh"
      }}
    >

      <Typography
        sx={{
          fontSize: { xs: "32px", md: "42px" },
          fontWeight: 700,
          color: "#053565",
          mb: 4
        }}
      >
        My Wishlist
      </Typography>

      {wishlist.length === 0 ? (

        <Typography
          sx={{
            fontSize: "22px",
            color: "gray"
          }}
        >
          Wishlist is Empty
        </Typography>

      ) : (

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >

          {wishlist.map((item, index) => (

            <Box
              key={index}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "25px",
                border: "2px solid #4c81a8",
                p: { xs: 2, md: 3 },

                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row"
                },

                alignItems: {
                  xs: "flex-start",
                  md: "center"
                },

                justifyContent: "space-between",
                gap: 3,

                boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
              }}
            >

              {/* LEFT */}
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  width: "100%"
                }}
              >

                <img
                  src={
                    item.productimage?.includes("-")
                      ? `http://localhost:7000/Uploads/${item.productimage}`
                      : `/images/${item.productimage}`
                  }

                  alt={item.productname}

                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "18px",
                    border: "2px solid #2b5b9f"
                  }}
                />

                <Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "24px",
                        md: "30px"
                      },
                      fontWeight: 700,
                      color: "#061f34"
                    }}
                  >
                    {item.productname}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1a5fae"
                    }}
                  >
                    ₹{item.productprice}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#10b981",
                      mt: 1,
                      fontWeight: 600
                    }}
                  >
                    Available
                  </Typography>

                </Box>

              </Box>

              {/* RIGHT */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row"
                  },

                  gap: 2,
                  alignItems: "center",
                  width: {
                    xs: "100%",
                    md: "auto"
                  }
                }}
              >

                {/* SIZE ONLY FOR CLOTHING */}
                {item.category === "clothing" && (

                  <Select
                    size="small"
                    value={sizes[item._id] || ""}

                    onChange={(e) =>
                      setSizes({
                        ...sizes,
                        [item._id]: e.target.value
                      })
                    }

                    displayEmpty

                    sx={{
                      minWidth: "120px",
                      borderRadius: "12px"
                    }}
                  >

                    <MenuItem value="">
                      Size
                    </MenuItem>

                    <MenuItem value="S">
                      S
                    </MenuItem>

                    <MenuItem value="M">
                      M
                    </MenuItem>

                    <MenuItem value="L">
                      L
                    </MenuItem>

                    <MenuItem value="XL">
                      XL
                    </MenuItem>

                  </Select>

                )}

                <Button
                  variant="contained"

                  onClick={() => {

                    addToCart({
                      ...item,
                      size:
                        item.category === "clothing"
                          ? sizes[item._id]
                          : "Free Size"
                    });
                      navigate("/cart");                  
                  }}

                  sx={{
                    backgroundColor: "#438ac0",
                    borderRadius: "14px",
                    px: 4,
                    py: 1.3,
                    fontWeight: 700,

                    "&:hover": {
                      backgroundColor: "#28a349"
                    }
                  }}
                >
                  Move To Cart
                </Button>

                <IconButton
                  onClick={() =>
                    removeFromWishlist(item._id)
                  }

                  sx={{
                    backgroundColor: "#ffe4ec",
                    color: "#e91e63",

                    "&:hover": {
                      backgroundColor: "#ffd1df"
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>

              </Box>

            </Box>

          ))}

        </Box>

      )}

    </Box>
  );
}