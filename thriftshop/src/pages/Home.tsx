import { useEffect, useState } from "react";
import "../styles/_cards.scss";
import { getCurrentUser, setCurrentUser } from "../utils/auth";
import { useAlert } from "../services/useAlert";
import ProductModal from "../components/ProductModal";
import { Product } from "../types/product";


const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("title-asc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { showAlert } = useAlert();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOption.includes("title")) {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      if (sortOption === "title-dsc") {
        filtered.reverse();
      }
    } else if (sortOption.includes("price")) {
      filtered.sort((a, b) => a.price - b.price);
      if (sortOption === "price-dsc") {
        filtered.reverse();
      }
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortOption, products]);

  const handleAddToCart = (product: Product) => {
    const user = getCurrentUser();
    if (!user) return;
    const existingItem = user.cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }
    setCurrentUser(user);
    showAlert("success", "Product added to cart!");
  };

  return (
    <div className="home-div">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by title or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="title-asc">Sort by Title (A-Z)</option>
          <option value="title-dsc">Sort by Title (Z-A)</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-dsc">Sort by Price (High to Low)</option>
        </select>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="div-image">
              <img src={product.image} alt={product.title} />
            </div>
            <h3>
              {product.title.length > 20
                ? product.title.slice(0, 20) + "..."
                : product.title}
            </h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevent triggering modal
              handleAddToCart(product);
            }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Home;
