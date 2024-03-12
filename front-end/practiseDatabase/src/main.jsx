import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import Products from "./components/Products.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Otp from "./components/Otp";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>

          {/* <Route index element={<Products />} /> */}
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Otp" element={<Otp />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
