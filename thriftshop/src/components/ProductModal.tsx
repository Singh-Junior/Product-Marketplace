// src/components/ProductModal.tsx
import React from "react";
import "../styles/_productModal.scss";
import { Product } from "../types/product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <img src={product.image} className="product-img"/>
        <h2>{product.title}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="desc">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductModal;
