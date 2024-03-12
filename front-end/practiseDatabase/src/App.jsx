import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default App;
