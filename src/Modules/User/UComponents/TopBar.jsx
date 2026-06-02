import React, { useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Drawer
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

function Topbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  // SEARCH FUNCTION
  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(`/search/${search}`);
  };

  // CLEAR SEARCH + GO HOME
const clearSearch = () => {

  setSearch("");

  navigate("/home");
};

  return (

    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#054d79",
        px: { xs: 1, md: 2 }
      }}
    >

      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2
        }}
      >

        {/* MOBILE MENU */}
        <IconButton
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#fff"
          }}
          onClick={() => setOpenMenu(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* LOGO */}
        <Typography
          onClick={() => navigate("/")}
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "20px", md: "28px" },
            color: "#ffffff",
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          CROCHY
        </Typography>

        {/* SEARCH BAR */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "30px",
            px: 2,
            flex: 1,
            maxWidth: "700px",
            border: "2px solid #062f6c",
            mx: { xs: 1, md: 3 },
            minWidth: 0
          }}
        >

          {/* SEARCH ICON */}
          <SearchIcon
            sx={{
              color: "#35c3e6",
              mr: 1,
              cursor: "pointer",
              fontSize: {
                xs: "22px",
                md: "26px"
              }
            }}
            onClick={handleSearch}
          />

          {/* INPUT */}
          <InputBase
            placeholder="Search crochet items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}

            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleSearch();
              }
            }}

            sx={{
              width: "100%",
              fontSize: {
                xs: "14px",
                md: "16px"
              }
            }}
          />

          {/* CLEAR BUTTON */}
          {search && (

            <CloseIcon
              onClick={clearSearch}

              sx={{
                cursor: "pointer",
                color: "#777",
                ml: 1,

                fontSize: {
                  xs: "20px",
                  md: "24px"
                },

                "&:hover": {
                  color: "#e91e63"
                }
              }}
            />

          )}

        </Box>

        {/* DESKTOP NAVIGATION */}
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex"
            },
            gap: 1
          }}
        >

          <Button
            onClick={() => navigate("/home")}
            sx={{ color: "#ffffff" }}
          >
            Home
          </Button>

          <Button
            onClick={() => navigate("/orders")}
            sx={{ color: "#ffffff" }}
          >
            Orders
          </Button>

          <Button
            onClick={() => navigate("/wishlist")}
            sx={{ color: "#ffffff" }}
          >
            Wishlist
          </Button>

          <Button
            onClick={() => navigate("/cart")}
            sx={{ color: "#ffffff" }}
          >
            Cart
          </Button>

          <Button
            onClick={() => navigate("/login")}
            sx={{ color: "#ffffff" }}
          >
            Login
          </Button>

        </Box>

      </Toolbar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={openMenu}
        onClose={() => setOpenMenu(false)}
      >

        <Box
          sx={{
            width: 220,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >

          <Button onClick={() => navigate("/home")}>
            Home
          </Button>

          <Button onClick={() => navigate("/orders")}>
            Orders
          </Button>

          <Button onClick={() => navigate("/wishlist")}>
            Wishlist
          </Button>

          <Button onClick={() => navigate("/cart")}>
            Cart
          </Button>

          <Button onClick={() => navigate("/login")}>
            Login
          </Button>

        </Box>

      </Drawer>

    </AppBar>
  );
}

export default Topbar;