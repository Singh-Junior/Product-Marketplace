// src/components/Sidebar.tsx
import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { logout } from "../utils/auth";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();               
    navigate("/login");      
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        style={{ marginLeft: isCollapsed ? "45px" : "155px" }}
      >
        {isCollapsed ? ">" : "<"}
      </button>
      <div className="sidebar-content">
        <ul>
          <li>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img src="./home.png" height={20} width={20} />{" "}
              {!isCollapsed && <span style={{ marginLeft: "8px" }}>Home</span>}
            </Link>
          </li>
          {/* <li>
            {" "}
            <img
              src="./dairy-products.png"
              height={20}
              width={20}
            />{" "}
            {!isCollapsed && (
              <span style={{ marginLeft: "8px" }}>Products</span>
            )}
          </li> */}
          <li>
            <Link
              to="/orders"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img src="./delivery.png" height={20} width={20} />{" "}
              {!isCollapsed && (
                <span style={{ marginLeft: "8px", marginTop: "-4px" }}>
                  Orders
                </span>
              )}
            </Link>
          </li>
          {/* <li>
            {" "}
            <img src="./profile.png" height={20} width={20} />{" "}
            {!isCollapsed && <span style={{ marginLeft: "8px" }}>Account</span>}
          </li> */}
        </ul>
        <ul>
          <li className="logout" onClick={handleLogout} style={{ cursor: "pointer" }}>
            <img src="./logout.png" height={20} width={20} />
            {!isCollapsed && <span style={{ marginLeft: "8px" }}>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
