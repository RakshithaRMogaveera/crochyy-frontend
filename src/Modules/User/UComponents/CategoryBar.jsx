import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryBar() {
  const navigate = useNavigate();

  const categories = [
    { icon: "👗", name: "Clothing" },
    { icon: "👜", name: "Accessories" },
    { icon: "🏠", name: "Decoratives" },
    { icon: "🧵", name: "Yarn" },
    { icon: "🎁", name: "Gifts" }
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 4,
        py: 2,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eee",
        overflowX: "auto"
      }}
    >
      {categories.map((cat) => (
        <Box
          key={cat.name}
onClick={() => navigate(`/${cat.name.toLowerCase()}`)}
          sx={{
            textAlign: "center",
            cursor: "pointer",
            minWidth: "80px",
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-3px)"
            }
          }}
        >
          <Box
            sx={{
              width: "60px",
              height: "60px",
              mx: "auto",
              borderRadius: "14px",
              backgroundColor: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px"
            }}
          >
            {cat.icon}
          </Box>

          <Typography
            sx={{
              mt: 1,
              fontSize: "13px",
              fontWeight: 500,
              color: "#1565c0"
            }}
          >
            {cat.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}