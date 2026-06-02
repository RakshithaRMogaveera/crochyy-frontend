import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import CategoryBar from "./CategoryBar";
import { useNavigate } from "react-router-dom";
export default function CrochyyHome() {
  const navigate = useNavigate();
  return (
    <Box>

      {/* HERO */}
      <Box
        sx={{
          background: "linear-gradient(to right, #62b5e5, #c2e2ef)",
          textAlign: "center",
          py: 10,
          color: "white"
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Welcome to Crochyy
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Your one-stop destination for handmade crochet treasures
        </Typography>
      </Box>

      {/* OUR STORY */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h5" sx={{ color: "#002864", fontWeight: 600 }}>
          Our Story
        </Typography>

        <Typography sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>
          Crochyy was born from a passion for handcrafted artistry and a love for crochet. We connect talented artisans from around the world with customers who appreciate the beauty, uniqueness, and warmth of handmade crochet products.
Every item on Crochyy is carefully crafted with love, patience, and attention to detail. From cozy clothing to charming home decor, each piece tells its own story and brings a personal touch to your life.
        </Typography>
      </Box>

      {/* WHY CHOOSE CROCHYY */}
<Box sx={{ textAlign: "center", py: 6 }}>

  <Typography
    variant="h5"
    sx={{ color: "#002864", fontWeight: 700 }}
  >
    Why Choose Crochyy?
  </Typography>

  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 3,
      mt: 4,
      flexWrap: "wrap"
    }}
  >
    {[
      { icon: "🧶", title: "Handmade Quality", desc: "Every product is lovingly crafted by skilled artisans using premium materials." },
      { icon: "🌍", title: "Support Small Businesses", desc: "Your purchase directly supports independent creators and small businesses." },
      { icon: "💖", title: "Unique Designs", desc: "Discover one-of-a-kind items you won’t find anywhere else." },
      { icon: "♻️", title: "Eco-Friendly", desc: "Handmade products mean less waste and a smaller carbon footprint." }
    ].map((item, index) => (

      <Box
        key={index}
        sx={{
          width: "230px",
          p: 2.5,
          borderRadius: "18px",
          backgroundColor: "#c9ddf3",
          border: "1px solid #f8bbd0",
          textAlign: "center",
          transition: "0.25s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
          }
        }}
      >

        <Typography sx={{ fontSize: "30px", mb: 1 }}>
          {item.icon}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            color: "#002864",
            fontSize: "16px",
            mb: 1
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            fontSize: "13px",
            color: "#555",
            lineHeight: 1.5
          }}
        >
          {item.desc}
        </Typography>

      </Box>

    ))}
  </Box>
</Box>
<Box sx={{ mt: 8, textAlign: "center" }}>

  <Typography
    variant="h5"
    sx={{
      fontWeight: 700,
      color: "#002864",
      mb: 3
    }}
  >
    Our Mission
  </Typography>

  <Typography
    sx={{
      maxWidth: "800px",
      margin: "0 auto",
      color: "#555",
      fontSize: "16px",
      lineHeight: 1.8
    }}
  >
    At Crochyy, our mission is to celebrate the art of crochet and empower artisans by providing a platform where their creativity can flourish. We believe in sustainable fashion, conscious consumption, and the timeless beauty of handcrafted goods.
  </Typography>

</Box>
  {/* WHAT WE OFFER */}
<Box sx={{ textAlign: "center", py: 6 }}>

  <Typography
    variant="h5"
    sx={{ color: "#002864", fontWeight: 700 }}
  >
    What We Offer
  </Typography>

  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 2,
      mt: 4,
      flexWrap: "nowrap",
      overflowX: "auto"
    }}
  >
    {[
  {
    icon: "👗",
    title: "Clothing",
    desc: "Stylish tops, dresses, cardigans, and more",
    path: "/clothing"
  },

  {
    icon: "👜",
    title: "Accessories",
    desc: "Bags, jewelry, scarves, and fashion accessories",
    path: "/accessories"
  },

  {
    icon: "🏠",
    title: "Home Decor",
    desc: "Wall hangings, cushions, and decorative items",
    path: "/decoratives"
  },

  {
    icon: "🧵",
    title: "Premium Yarn",
    desc: "High-quality yarn for your own creations",
    path: "/yarn"
  },

  {
    icon: "🎁",
    title: "Gifts",
    desc: "Thoughtful handmade gifts for every occasion",
    path: "/gifts"
  }

].map((item, index) => (

      <Box
  key={index}
  onClick={() => navigate(item.path)}
  sx={{
    cursor: "pointer",
          width: "180px",
          minWidth: "180px",
          p: 2,
          borderRadius: "16px",
          backgroundColor: "#c9ddf3",
          border: "1px solid #f8bbd0",
          textAlign: "center",
          flexShrink: 0,
          transition: "0.25s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
          }
        }}
      >
        <Typography sx={{ fontSize: "26px", mb: 0.5 }}>
          {item.icon}
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            color: "#002864",
            fontSize: "14px",
            mb: 0.5
          }}
        >
          {item.title}
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#555",
            lineHeight: 1.4
          }}
        >
          {item.desc}
        </Typography>

      </Box>

    ))}
  </Box>
</Box>
      {/* CTA */}
      <Box
        sx={{
          background: "linear-gradient(to right, #62b5e5, #c2e2ef)",
          textAlign: "center",
          py: 6,
          color: "white",
          mt: 4
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Join the Crochyy Community
        </Typography>

        <Button
  variant="contained"
  onClick={() => navigate("/home")}   // ✅ CHANGE THIS
  sx={{
    mt: 2,
    backgroundColor: "white",
    color: "#002864"
  }}
>
  Start Shopping
</Button>
      </Box>

    </Box>
  );
}