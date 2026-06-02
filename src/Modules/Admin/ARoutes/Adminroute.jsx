import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import Sidebar from "../AComponents/Sidebar";
import AHome from "../AComponents/AHome";
import Pregister from "../AComponents/Pregister";
import ViewUser from "../AComponents/ViewUser";
import ViewProducts from "../AComponents/ViewProducts";
import ViewCategory from "../AComponents/ViewCategory";
import AddCategory from "../AComponents/AddCategory";
import UpdateCategory from "../AComponents/UpdateCategory";
import Addproduct from "../AComponents/Addproduct";
import UpdateProduct from "../AComponents/UpdateProduct";

export default function Adminroute() {

  return (

    <Box sx={{ display: "flex" }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >

        {/* FIX TOP SPACE */}
        <Toolbar />

        <Routes>

          {/* DEFAULT DASHBOARD */}
          <Route
            path="/"
            element={<AHome />}
          />

          <Route
            path="/AHome"
            element={<AHome />}
          />

          <Route
            path="/Pregister"
            element={<Pregister />}
          />

          <Route
            path="/ViewUser"
            element={<ViewUser />}
          />

          <Route
            path="/ViewProducts"
            element={<ViewProducts />}
          />

          <Route
            path="/ViewCategory"
            element={<ViewCategory />}
          />

          <Route
            path="/AddCategory"
            element={<AddCategory />}
          />

          <Route
            path="/UpdateCategory/:rowid"
            element={<UpdateCategory />}
          />

          <Route
            path="/AddProduct"
            element={<Addproduct />}
          />

          <Route
            path="/UpdateProduct/:rowid"
            element={<UpdateProduct />}
          />

        </Routes>

      </Box>

    </Box>

  );
}