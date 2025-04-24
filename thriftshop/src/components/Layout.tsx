import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        <Outlet /> {/* Will render Home or Cart based on route */}
      </div>
    </div>
  );
};

export default Layout;
