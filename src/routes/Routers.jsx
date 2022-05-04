import React from "react";
import { Route, Routes } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { GuestOnlyRoute } from "../data/GuestOnlyRoute";
import { UserOnlyRoute } from "../data/UserOnlyRoute";
import PageLoading from "../images/Svg/PageLoading";
import Account from "../pages/Account";
import AddProduct from "../pages/AddProduct";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";

function Routers() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      <Route
        path="/account"
        element={
          <UserOnlyRoute isAuthenticated={user}>
            <Account />
          </UserOnlyRoute>
        }
      />
      <Route
        path="/add"
        element={
          <UserOnlyRoute isAuthenticated={user}>
            <AddProduct />
          </UserOnlyRoute>
        }
      />

      <Route
        path="/login"
        element={
          <GuestOnlyRoute isAuthenticated={user}>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute isAuthenticated={user}>
            <Register />
          </GuestOnlyRoute>
        }
      />
    </Routes>
  );
}

export default Routers;
