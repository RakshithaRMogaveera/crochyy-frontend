import * as React from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import CategoryBar from "./CategoryBar";

export default function Products() {

  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [sort, setSort] = useState("popularity");

  const { addToWishlist, addToCart } = useContext(StoreContext);

  // ✅ GET CATEGORY FROM URL (?category=Clothing)
  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get("category");

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    axios.get('http://localhost:7000/product/getproducts')
      .then((res) => setProducts(res.data.products))
      .catch((error) => console.log(error));
  }, []);

  // ✅ FILTER PRODUCTS
  const filteredProducts = selectedCategory
    ? products.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : products;

  // ✅ SORT
  let finalProducts = [...filteredProducts];

  if (sort === "low") {
    finalProducts.sort((a, b) => a.product_price - b.product_price);
  } else if (sort === "high") {
    finalProducts.sort((a, b) => b.product_price - a.product_price);
  }

  // ✅ BUY
  const handleBuyNow = (product) => {

  addToCart({

    ...product,

    size: selectedSize,

    qty: 1,

    productname:
      product.productname ||
      product.product_name,

    productprice:
      product.productprice ||
      product.product_price,

    productimage:
      product.productimage,

    image:
      product.productimage
  });

  navigate("/cart");
};

  return (
    <Box sx={{ p: 3 }}>

      {/* CATEGORY BAR */}
      <CategoryBar />

      {/* TITLE + SORT */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>

        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {selectedCategory || "All Products"}
        </Typography>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="popularity">Popularity</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

      </Box>

      {/* GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 3
        }}
      >
        {finalProducts.map((pdata) => (

          <Card
            key={pdata._id}
            sx={{
              borderRadius: "16px",
              boxShadow: 3,
              p: 1
            }}
          >

            {/* IMAGE */}
            <CardMedia
              component="img"
              image={`http://localhost:7000/uploads/${pdata.productimage}`}
              sx={{
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/product/${pdata._id}`)}
            />

            {/* CONTENT */}
            <CardContent>

              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {pdata.product_name}
              </Typography>

              <Typography color="error" sx={{ fontWeight: 600 }}>
                ₹ {pdata.product_price}
              </Typography>

              {/* SIZE */}
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <Select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {["XS","S","M","L","XL","XXL"].map(size => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* BUTTONS */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>

                <Button
                  variant="outlined"
                  onClick={() => addToWishlist(pdata)}
                >
                  <FavoriteIcon />
                </Button>

                <Button
  variant="outlined"
  onClick={() =>
    addToCart({

      ...pdata,

      size: selectedSize,

      qty: 1,

      // ✅ VERY IMPORTANT
      productimage: pdata.productimage,

      image: pdata.productimage
    })
  }
>
  <ShoppingCartIcon />
</Button>

                <Button
                  variant="contained"
                  onClick={() => handleBuyNow(pdata)}
                  sx={{ backgroundColor: "#1565c0" }}
                >
                  BUY
                </Button>

              </Box>

            </CardContent>

          </Card>
        ))}
      </Box>

    </Box>
  );
}