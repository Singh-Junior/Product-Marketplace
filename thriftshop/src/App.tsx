// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import logo from "./assets/shopping.png";
import "./App.css";

function App() {

  return (
    <>
      <div>
        <img src={logo} alt="icon-logo"  height={60} width={60}/>
        <h1> Welcome to ThriftShop</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
