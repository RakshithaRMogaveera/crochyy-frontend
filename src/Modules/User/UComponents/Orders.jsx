import React, { useContext, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  IconButton
} from "@mui/material";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import QRCode from "react-qr-code";

export default function Orders() {

  const { orders, setOrders } =
    useContext(StoreContext);

  const [openTrack, setOpenTrack] =
    useState(false);

  const [openQR, setOpenQR] =
    useState(false);

  // CANCEL ORDER
  const cancelOrder = (indexToRemove) => {

    const reason = prompt(
      "Please enter cancellation reason:"
    );

    if (reason === null) {
      return;
    }

    if (reason.trim() === "") {

      alert(
        "Cancellation reason is required!"
      );

      return;
    }

    const updatedOrders =
      [...orders];

    updatedOrders.splice(
      indexToRemove,
      1
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    alert(
      "Your order has been cancelled successfully!"
    );
  };

  return (

    <Box sx={{ p: { xs: 2, md: 4 } }}>

      <Typography
        sx={{
          fontSize: {
            xs: "30px",
            md: "42px"
          },
          fontWeight: 700,
          mb: 4,
          color: "#1e293b"
        }}
      >
        My Orders
      </Typography>

      {orders.length === 0 ? (

        <Typography
          sx={{
            fontSize: "22px",
            color: "gray"
          }}
        >
          No Orders Yet
        </Typography>

      ) : (

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4
          }}
        >

          {orders.map((item, index) => (

            <Box
              key={index}
              sx={{
                border:
                  "1px solid #274780",

                borderRadius: "25px",

                overflow: "hidden",

                backgroundColor: "#fff",

                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)"
              }}
            >

              {/* TOP SECTION */}
              <Box
                sx={{
                  backgroundColor: "#ede9fe",

                  p: {
                    xs: 2,
                    md: 3
                  },

                  display: "flex",

                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  flexWrap: "wrap",

                  gap: 2
                }}
              >

                <Box>

                  <Typography
                    sx={{
                      color: "#10b981",

                      fontWeight: 700,

                      fontSize: {
                        xs: "24px",
                        md: "32px"
                      }
                    }}
                  >
                    Packed
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555",

                      fontSize: {
                        xs: "16px",
                        md: "18px"
                      }
                    }}
                  >
                    Arriving Soon
                  </Typography>

                </Box>

                {!item.isPaid && (

  <Button
    onClick={() => setOpenQR(true)}

    sx={{
      backgroundColor:
        "#3c81b9",

      color: "#fff",

      px: 4,

      py: 1,

      borderRadius: "12px",

      fontWeight: 700,

      "&:hover": {
        backgroundColor:
          "#1ba162"
      }
    }}
  >
    PAY NOW
  </Button>

)}

              </Box>

              {/* PRODUCT SECTION */}
              <Box
                sx={{
                  p: {
                    xs: 2,
                    md: 3
                  },

                  display: "flex",

                  gap: 3,

                  flexDirection: {
                    xs: "column",
                    sm: "row"
                  }
                }}
              >

                {/* PRODUCT IMAGE */}
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
                  border: "1px solid #1b455c"
                }}
              />

                {/* PRODUCT DETAILS */}
                <Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: "26px",
                        md: "34px"
                      },

                      fontWeight: 700,

                      color: "#063c59"
                    }}
                  >
                    {item.productname}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#2e7bbb"
                    }}
                  >
                    ₹{item.productprice}
                  </Typography>

                  {item.size && (

                    <Typography
                      sx={{ mt: 1 }}
                    >
                      Size: {item.size}
                    </Typography>

                  )}

                  <Typography
                    sx={{ mt: 1 }}
                  >
                    Quantity:
                    {" "}
                    {item.qty || item.quantity || 1}
                  </Typography>

                </Box>

              </Box>

              {/* BUTTONS */}
              <Box
                sx={{
                  display: "flex",

                  gap: 2,

                  p: {
                    xs: 2,
                    md: 3
                  },

                  flexWrap: "wrap"
                }}
              >

                <Button
                  startIcon={
                    <LocalShippingIcon />
                  }

                  variant="outlined"

                  onClick={() =>
                    setOpenTrack(true)
                  }

                  sx={{
                    borderRadius: "14px",

                    px: 3,

                    flex: {
                      xs: "1 1 100%",
                      sm: "unset"
                    }
                  }}
                >
                  TRACK ITEM
                </Button>

                <Button
                  startIcon={
                    <CancelIcon />
                  }

                  variant="outlined"

                  color="error"

                  onClick={() =>
                    cancelOrder(index)
                  }

                  sx={{
                    borderRadius: "14px",

                    px: 3,

                    flex: {
                      xs: "1 1 100%",
                      sm: "unset"
                    }
                  }}
                >
                  CANCEL ITEM
                </Button>

              </Box>

            </Box>

          ))}

        </Box>

      )}

      {/* TRACK DIALOG */}
      <Dialog
        open={openTrack}

        onClose={() =>
          setOpenTrack(false)
        }

        fullWidth

        maxWidth="sm"
      >

        <DialogContent sx={{ p: 4 }}>

          <Box
            sx={{
              display: "flex",

              justifyContent:
                "space-between",

              mb: 4
            }}
          >

            <Typography
              sx={{
                fontSize: "32px",

                fontWeight: 700
              }}
            >
              Track Item
            </Typography>

            <IconButton
              onClick={() =>
                setOpenTrack(false)
              }
            >
              <CloseIcon />
            </IconButton>

          </Box>

          <Box
            sx={{
              borderLeft:
                "4px solid #10b981",

              pl: 3,

              display: "flex",

              flexDirection: "column",

              gap: 5
            }}
          >

            <Box>

              <Typography
                sx={{
                  fontWeight: 700,

                  color: "#10b981",

                  fontSize: "24px"
                }}
              >
                Order Placed
              </Typography>

              <Typography>
                Thursday,
                {" "}
                07 May,
                {" "}
                5:00 PM
              </Typography>

            </Box>

            <Box>

              <Typography
                sx={{
                  fontWeight: 700,

                  fontSize: "24px"
                }}
              >
                Packed
              </Typography>

              <Typography>
                Item packed in dispatch warehouse
              </Typography>

            </Box>

            <Box>

              <Typography
                sx={{
                  fontWeight: 700,

                  fontSize: "24px"
                }}
              >
                Shipped
              </Typography>

              <Typography>
                Expected tomorrow
              </Typography>

            </Box>

            <Box>

              <Typography
                sx={{
                  fontWeight: 700,

                  fontSize: "24px"
                }}
              >
                Arriving Soon
              </Typography>

              <Typography>
                Delivery arriving shortly
              </Typography>

            </Box>

          </Box>

        </DialogContent>

      </Dialog>

      {/* QR DIALOG */}
      <Dialog
        open={openQR}

        onClose={() =>
          setOpenQR(false)
        }
      >

        <DialogContent
          sx={{
            textAlign: "center",
            p: 4
          }}
        >

          <Typography
            sx={{
              fontSize: "30px",

              fontWeight: 700,

              mb: 3,

              color: "#c2185b"
            }}
          >
            Scan To Pay
          </Typography>

          <QRCode
            value="Thank you for your payment ❤️"
            size={250}
          />

          <Typography
            sx={{
              mt: 3,
              color: "#555"
            }}
          >
            Thank you for your payment ❤️
          </Typography>

        </DialogContent>

      </Dialog>

    </Box>
  );
}