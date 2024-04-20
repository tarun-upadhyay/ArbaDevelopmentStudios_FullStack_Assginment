import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Homepage from "./Home/Homepage";

import { PrivateRoute } from "../Components/Privatetroute";
import AllProducts from "./AllProducts/AllProducts";
import Cart from "./Cart/Cart";
import Profile from "./Profile/Profile";
import Store from "./Store/Store";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/all-products"
        element={
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/my-store"
        element={
          <PrivateRoute>
            <Store />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default MainRoute;
