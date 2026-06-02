import React from 'react'

import {
  Route,
  Routes
} from 'react-router-dom'

import Topbar from '../UComponents/TopBar'

import UHome from '../UComponents/UHome'
import Login from '../UComponents/Login'
import Register from '../UComponents/Register'
import Products from '../UComponents/Products'
import MyProfile from '../UComponents/MyProfile'
import ProductDetails from '../UComponents/ProductDetails'
import BookingForm from '../UComponents/BookingForm'

import CrochyyHome from "../UComponents/CrochyyHome";
import Wishlist from "../UComponents/Wishlist";
import Cart from "../UComponents/Cart";
import Orders from "../UComponents/Orders";

import Clothing from "../UComponents/Clothing";
import Accessories from "../UComponents/Accessories";
import Decoratives from "../UComponents/Decoratives";
import Yarn from "../UComponents/Yarn";
import Gifts from "../UComponents/Gifts";

import SearchProducts from "../UComponents/SearchProducts";
import Checkout from "../UComponents/Checkout.jsx";

import AdminLogin from "../../Admin/AdminLogin";
// ADMIN
import AHome from "../../Admin/AComponents/AHome";
import Adminroute from "../../Admin/ARoutes/Adminroute";

export default function UserRoute() {

  return (

    <div>

      <Topbar/>

      <Routes>

        {/* MAIN PAGE */}
        <Route
          path='/'
          element={<CrochyyHome/>}
        />

        {/* USER PAGES */}
        <Route
          path='/home'
          element={<UHome/>}
        />

        <Route
          path='/login'
          element={<Login/>}
        />

        <Route
          path='/register'
          element={<Register/>}
        />

        <Route
          path='/products'
          element={<Products/>}
        />

        <Route
          path='/myprofile'
          element={<MyProfile/>}
        />

        <Route
          path='/product/:id'
          element={<ProductDetails/>}
        />

        <Route
          path='/bookingform/:productId'
          element={<BookingForm/>}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/clothing"
          element={<Clothing />}
        />

        <Route
          path="/accessories"
          element={<Accessories />}
        />

        <Route
          path="/decoratives"
          element={<Decoratives />}
        />

        <Route
          path="/yarn"
          element={<Yarn />}
        />

        <Route
          path="/gifts"
          element={<Gifts />}
        />

        <Route
          path="/search/:keyword"
          element={<SearchProducts />}
        />

        {/* ADMIN LOGIN */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* PROTECTED ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <Adminroute>
              <AHome />
            </Adminroute>
          }
        />

      </Routes>

    </div>
  )
}