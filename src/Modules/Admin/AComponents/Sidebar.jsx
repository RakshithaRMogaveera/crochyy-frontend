import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { Link } from "react-router-dom";

const drawerWidth = 240;

// MAIN CONTENT SHIFT
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: open ? `${drawerWidth}px` : 0,
    transition: "all 0.3s",
  })
);

// APPBAR SHIFT
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  transition: "all 0.3s",
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  marginLeft: open ? `${drawerWidth}px` : 0,
}));

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOP BAR */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/Admin/AHome">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
  <ListItemButton component={Link} to="/Admin/ViewProducts">
    <ListItemIcon>
      <InventoryIcon />
    </ListItemIcon>
    <ListItemText primary="View Products" />
  </ListItemButton>
</ListItem>
        </List>

        <Divider />

        <List>
          {[
            { label: "ViewUser", link: "/Admin/ViewUser" },
            { label: "ViewCategory", link: "/Admin/ViewCategory" },
            { label: "AddCategory", link: "/Admin/AddCategory" },
            { label: "AddProduct", link: "/Admin/AddProduct" },
          ].map((item, index) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* MAIN CONTENT AREA */}
      <Main open={open}>
        <Toolbar />
      </Main>
    </Box>
  );
}