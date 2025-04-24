import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import ProtectedRoute from "./services/routes/ProtectedRoutes";
import Layout from "./components/Layout"; // 👈 Shared layout with Header + Sidebar
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
