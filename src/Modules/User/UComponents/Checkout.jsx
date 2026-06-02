import React, {
  useState,
  useContext
} from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Dialog,
  DialogContent
} from "@mui/material";

import QRCode from "react-qr-code";

import {
  useNavigate
} from "react-router-dom";

import {
  StoreContext
} from "../../../context/StoreContext";

export default function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    setCart,
    orders,
    setOrders
  } = useContext(StoreContext);

  const [payment, setPayment] =
    useState("Cash on Delivery");

  const [openQR, setOpenQR] =
    useState(false);
    const minDate = new Date();

minDate.setDate(
  minDate.getDate() + 3
);

const formattedMinDate =
  minDate.toISOString()
    .split("T")[0];

  // PLACE ORDER
  const handlePlaceOrder = () => {

    // SAVE CART PRODUCTS INTO ORDERS
    const updatedOrders = [

      ...orders,

      ...cart.map((item) => ({

  ...item,

  paymentMethod: payment,

  isPaid:
    payment === "UPI" ||
    payment === "Card",

  productimage:
    item.productimage ||
    item.image ||
    item.productImage

}))
    ];

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // CLEAR CART
    setCart([]);

    localStorage.setItem(
      "cart",
      JSON.stringify([])
    );

    // ONLINE PAYMENT
    if (
      payment === "UPI" ||
      payment === "Card"
    ) {

      setOpenQR(true);
    }

    // CASH ON DELIVERY
    else {

      alert(
        "✅ Order Placed Successfully!"
      );

      navigate("/orders");
    }
  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fff7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 5
      }}
    >

      {/* MAIN BOX */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "650px",
          backgroundColor: "#fff",
          border: "1px solid #f8bbd0",
          borderRadius: "25px",
          p: { xs: 3, md: 5 },
          boxShadow:
            "0 5px 18px rgba(0,0,0,0.08)"
        }}
      >

        {/* TITLE */}
        <Typography
          sx={{
            fontSize: {
              xs: "28px",
              md: "36px"
            },
            fontWeight: 700,
            color: "#c2185b",
            mb: 4,
            textAlign: "center"
          }}
        >
          Checkout & Payment
        </Typography>

        {/* FORM */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >

          {/* NAME */}
          <Box>

            <Typography
              sx={{
                color: "#ec4899",
                fontWeight: 600,
                mb: 1
              }}
            >
              Name:
            </Typography>

            <TextField
              placeholder="Full Name"
              fullWidth
            />

          </Box>

          {/* ADDRESS */}
          <Box>

            <Typography
              sx={{
                color: "#ec4899",
                fontWeight: 600,
                mb: 1
              }}
            >
              Address:
            </Typography>

            <TextField
              placeholder="Delivery Address"
              fullWidth
            />

          </Box>

          {/* PAYMENT */}
          <Box>

            <Typography
              sx={{
                color: "#ec4899",
                fontWeight: 600,
                mb: 1
              }}
            >
              Payment Method:
            </Typography>

            <TextField
              select
              fullWidth
              value={payment}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            >

              <MenuItem value="Cash on Delivery">
                Cash on Delivery
              </MenuItem>

              <MenuItem value="UPI">
                UPI
              </MenuItem>

             {/* 
             <MenuItem value="Card">
                Card
              </MenuItem>
              */}

            </TextField>

          </Box>

          {/* COUPON */}
          <Box>

            <Typography
              sx={{
                color: "#ec4899",
                fontWeight: 600,
                mb: 1
              }}
            >
              Apply Offer Coupon:
            </Typography>

            <TextField
              placeholder="Coupon Code"
              fullWidth
            />

          </Box>

          {/* DATE */}
          <Box>

            <Typography
              sx={{
                color: "#ec4899",
                fontWeight: 600,
                mb: 1
              }}
            >
              Delivered At:
            </Typography>

            <TextField
  type="date"
  fullWidth
  inputProps={{
    min: formattedMinDate
  }}
/>

          </Box>

          {/* BUTTON */}
          <Button
            variant="contained"
            onClick={handlePlaceOrder}

            sx={{
              backgroundColor: "#ec4899",
              py: 1.7,
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "18px",
              mt: 2,

              "&:hover": {
                backgroundColor: "#db2777"
              }
            }}
          >
            Place Order
          </Button>

        </Box>

      </Box>

      {/* QR CODE DIALOG */}
      <Dialog
        open={openQR}
        onClose={() => setOpenQR(false)}
      >

        <DialogContent
          sx={{
            textAlign: "center",
            p: 5
          }}
        >

          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#c2185b",
              mb: 3
            }}
          >
            Scan To Pay
          </Typography>

          <QRCode
            value="Thank you for your payment ❤️"
            size={220}
          />

          <Typography
            sx={{
              mt: 3,
              color: "#555"
            }}
          >
            Complete payment using any UPI app
          </Typography>

          <Button
            variant="contained"

            onClick={() => {

              setOpenQR(false);

              alert(
                "✅ Payment Successful & Order Placed!"
              );

              navigate("/orders");
            }}

            sx={{
              mt: 4,
              backgroundColor: "#ec4899",

              "&:hover": {
                backgroundColor: "#db2777"
              }
            }}
          >
            Payment Done
          </Button>

        </DialogContent>

      </Dialog>

    </Box>
  );
}