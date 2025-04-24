import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import "../styles/_orders.scss";
import "../styles/_cart.scss";

type Product = {
  id: number;
  title: string;
  price: number;
};

const Orders = () => {
  const [orders, setOrders] = useState<Product[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    const boughtItems = user?.boughtItems || []; // ✅ safely fallback to empty array

    if (boughtItems.length === 0) {
      setOrders([]);
      return;
    }

    // Fetch all products
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter((product) =>
          boughtItems.includes(product.id)
        );
        setOrders(filtered);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      });
  }, []);

  return (
    <div className="order-items-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-order">
          <img src="./delivery.png" alt="No Orders" />
        </div>
      ) : (
        <ul>
          {orders.map((item) => (
            // <li key={item.id} className="order-item">
            //   <span className="title">{item.title}</span>
            //   <span className="price">${item.price.toFixed(2)}</span>
            // </li>
            <div className="order-items" key={item.id}>
              <div className="order-item">
                <div className="center-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="order-item-details">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
