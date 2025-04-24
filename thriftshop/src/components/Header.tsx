import { Link } from "react-router-dom";

const Header = () => {

  return (
    <header className="header">
      <div className="icon-title">
        <img
          src="./shopping.png"
          height={40}
          style={{ padding: "20px" }}
          width={40}
          alt="Logo"
        />
        <h1>ThriftShop</h1>
      </div>
      <div className="cart-container">
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <img
            src="./shopping-cart.png"
            height={30}
            className="cart-icon"
            width={30}
            alt="Cart"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
