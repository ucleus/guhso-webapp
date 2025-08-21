import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Handle different image URL structures from API
  const getImageUrl = () => {
    // If images array exists and has items
    if (product.images?.length > 0) {
      const firstImage = product.images[0];
      // Check for nested URLs object
      if (firstImage.urls?.thumbnail) {
        return firstImage.urls.thumbnail;
      }
      // Check for direct URL properties
      if (firstImage.cdn_url_thumb) {
        return firstImage.cdn_url_thumb;
      }
      if (firstImage.cdn_url_sm) {
        return firstImage.cdn_url_sm;
      }
    }
    // Fallback to direct image_url property
    if (product.image_url) {
      return product.image_url;
    }
    // Default placeholder
    return '/images/placeholder-product.jpg';
  };

  const imageUrl = getImageUrl();
  const price = product.base_price ?? product.price;

  return (
    <div className="product-card">
      <Link to={`/merch/${product.slug}`}>
        <img src={imageUrl} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        {price !== undefined && (
          <p className="price">{'$'}{price.toFixed(2)}</p>
        )}
        {product.inventory_badge && (
          <span className="inventory-badge">{product.inventory_badge}</span>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;

