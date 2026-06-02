import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import axios from "axios";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

const AHome = () => {

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchDashboardData = async () => {

    try {

      const [
        productRes,
        userRes,
        categoryRes
      ] = await Promise.all([

        axios.get(
          "http://localhost:7000/product/getproducts"
        ),

        axios.get(
          "http://localhost:7000/user/getuser"
        ),

        axios.get(
          "http://localhost:7000/category/getcategory"
        ),

      ]);

      // PRODUCTS
      setProducts(
        productRes.data?.products || []
      );

      // USERS
      setUsers(
        userRes.data?.allusers || []
      );

      // CATEGORIES
      setCategories(
        categoryRes.data?.allcategory || []
      );

      // ORDERS FROM LOCAL STORAGE
      const savedOrders =
        JSON.parse(
          localStorage.getItem("orders")
        ) || [];

      setOrders(savedOrders);

    } catch (err) {

      console.log(
        "Dashboard Error:",
        err
      );

    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#1976d2"
        }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>

        {/* PRODUCTS */}
        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{
              borderRadius: 3,
              color: "#fff",
              background:
                "linear-gradient(135deg, #42a5f5, #1976d2)",
              boxShadow: 4
            }}
          >

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >

              <Box>

                <Typography>
                  Total Products
                </Typography>

                <Typography variant="h4">
                  {products.length}
                </Typography>

              </Box>

              <ShoppingBagIcon
                sx={{ fontSize: 40 }}
              />

            </CardContent>

          </Card>

        </Grid>

        {/* CATEGORIES */}
        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{
              borderRadius: 3,
              color: "#fff",
              background:
                "linear-gradient(135deg, #66bb6a, #2e7d32)",
              boxShadow: 4
            }}
          >

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >

              <Box>

                <Typography>
                  Categories
                </Typography>

                <Typography variant="h4">
                  {categories.length}
                </Typography>

              </Box>

              <CategoryIcon
                sx={{ fontSize: 40 }}
              />

            </CardContent>

          </Card>

        </Grid>

        {/* ORDERS */}
        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{
              borderRadius: 3,
              color: "#fff",
              background:
                "linear-gradient(135deg, #ffa726, #ef6c00)",
              boxShadow: 4
            }}
          >

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >

              <Box>

                <Typography>
                  Orders
                </Typography>

                <Typography variant="h4">
                  {orders.length}
                </Typography>

              </Box>

              <ShoppingCartIcon
                sx={{ fontSize: 40 }}
              />

            </CardContent>

          </Card>

        </Grid>

        {/* USERS */}
        <Grid item xs={12} sm={6} md={3}>

          <Card
            sx={{
              borderRadius: 3,
              color: "#fff",
              background:
                "linear-gradient(135deg, #ab47bc, #6a1b9a)",
              boxShadow: 4
            }}
          >

            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >

              <Box>

                <Typography>
                  Users
                </Typography>

                <Typography variant="h4">
                  {users.length}
                </Typography>

              </Box>

              <PeopleIcon
                sx={{ fontSize: 40 }}
              />

            </CardContent>

          </Card>

        </Grid>

      </Grid>

    </Box>

  );
};

export default AHome;