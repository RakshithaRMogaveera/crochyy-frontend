import React, { useContext } from "react";

import {
  Box,
  Typography,
  Button,
  IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { StoreContext } from "../../../context/StoreContext";
import { useNavigate } from "react-router-dom";
export default function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty
  } = useContext(StoreContext);
const navigate = useNavigate();
  const total = cart.reduce(
    (acc, item) =>
      acc + item.productprice * item.qty,
    0
  );

  return (

    <Box
      sx={{
        px: { xs: 2, md: 5 },
        py: 4,
        backgroundColor: "#edfbff",
        minHeight: "100vh"
      }}
    >

      {/* TITLE */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#003678",
          mb: 4,
          fontSize: { xs: "30px", md: "38px" }
        }}
      >
        Shopping Cart
      </Typography>

      {/* EMPTY CART */}
      {cart.length === 0 && (

        <Typography
          sx={{
            textAlign: "center",
            color: "#777",
            fontSize: "20px",
            mt: 10
          }}
        >
          Your cart is empty
        </Typography>
      )}

      {/* CART ITEMS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}
      >

        {cart.map((item) => (

          <Box
            key={`${item._id}-${item.size}`}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row"
              },
              alignItems: {
                xs: "flex-start",
                sm: "center"
              },
              justifyContent: "space-between",
              gap: 3,
              p: 3,
              borderRadius: "22px",
              backgroundColor: "#fff",
              border: "1px solid #123a89",
              boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
            }}
          >

            {/* LEFT SIDE */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                width: "100%",
                alignItems: "center"
              }}
            >

              {/* IMAGE */}
              <img
                src={
                  item.productimage?.includes("-")
                    ? `http://localhost:7000/Uploads/${item.productimage}`
                    : `/images/${item.productimage}`
                }

                alt={item.productname}

                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  border: "1px solid #2b429f"
                }}
              />

              {/* DETAILS */}
              <Box sx={{ flex: 1 }}>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: {
                      xs: "22px",
                      md: "28px"
                    },
                    color: "#203785"
                  }}
                >
                  {item.productname}
                </Typography>

                <Typography
                  sx={{
                    color: "#3684ce",
                    fontWeight: 700,
                    fontSize: "24px",
                    mt: 1
                  }}
                >
                  ₹{item.productprice}
                </Typography>

                {item.size && item.size !== "Free Size" && (
                  <Typography
                    sx={{
                      color: "#555",
                      mt: 1,
                      fontSize: "18px"
                    }}
                  >
                    Size: {item.size}
                  </Typography>
                )}

                {/* QUANTITY */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2
                  }}
                >

                  <IconButton
                    onClick={() =>
                      decreaseQty(
                        item._id,
                        item.size
                      )
                    }

                    sx={{
                      backgroundColor: "#fce4ec",
                      color: "#e91e63",

                      "&:hover": {
                        backgroundColor: "#f8bbd0"
                      }
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      minWidth: "20px",
                      textAlign: "center"
                    }}
                  >
                    {item.qty}
                  </Typography>

                  <IconButton
                    onClick={() =>
                      increaseQty(
                        item._id,
                        item.size
                      )
                    }

                    sx={{
                      backgroundColor: "#fce4ec",
                      color: "#e91e63",

                      "&:hover": {
                        backgroundColor: "#f8bbd0"
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>

                </Box>

              </Box>

            </Box>

            {/* REMOVE BUTTON */}
            <IconButton
              onClick={() =>
                removeFromCart(
                  item._id,
                  item.size
                )
              }

              sx={{
                backgroundColor: "#ffebee",
                color: "#e53935",
                alignSelf: {
                  xs: "flex-end",
                  sm: "center"
                },

                "&:hover": {
                  backgroundColor: "#ffcdd2"
                }
              }}
            >
              <DeleteIcon />
            </IconButton>

          </Box>
        ))}

      </Box>

      {/* TOTAL + CHECKOUT */}
      {cart.length > 0 && (

        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            p: 3,
            borderRadius: "20px",
            backgroundColor: "#fff",
            border: "1px solid #033b80"
          }}
        >

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: {
                xs: "28px",
                md: "34px"
              },
              color: "#00897b"
            }}
          >
            Total: ₹{total}
          </Typography>

          <Button
  variant="contained"

  onClick={() => navigate("/checkout")}

  sx={{
    backgroundColor: "#2c7bc0",
    px: 5,
    py: 1.5,
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "16px",

    "&:hover": {
      backgroundColor: "#1caf5c"
    }
  }}
>
  Proceed to Checkout
</Button>


        </Box>
      )}

    </Box>
  );
}