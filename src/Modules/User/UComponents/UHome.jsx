import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS
import CategoryBar from "./CategoryBar";

export default function UHome() {
  const navigate = useNavigate();   // ✅ ADD THIS

  return (
    <Box>
      <CategoryBar />

      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          height: "400px",
          borderRadius: "0px",
          overflow: "hidden",
          mb: 4
        }}
      >
        <Box
          component="img"
          src="/images/banner4.jpg" //adding image here
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(98, 178, 244, 0.6), rgba(144,202,249,0.4))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "#fff",
            px: 2
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Discover Handmade Beauty
          </Typography>

          <Typography sx={{ mt: 2, fontSize: "18px" }}>
            Unique crochet creations made with love 🧶
          </Typography>

          {/* YOUR BUTTON (UNCHANGED STYLE) */}
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#111827" }}
            onClick={() => navigate("/clothing")}   // ✅ JUST THIS
          >
            Shop Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
}