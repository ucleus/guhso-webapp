import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

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

  // Format price safely
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  // Check if product is in stock
  const isInStock = product.in_stock !== false && (product.total_stock === undefined || product.total_stock > 0);

  // Get the lowest price variant if there are variants
  const getVariantPrice = () => {
    if (product.variants && product.variants.length > 0) {
      const prices = product.variants.map(v => parseFloat(v.price || product.base_price || 0));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (minPrice === maxPrice) {
        return formatPrice(minPrice);
      }
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    }
    return formatPrice(price);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInStock && product.variants && product.variants.length > 0) {
      // If there are variants, redirect to product detail page
      window.location.href = `/merch/${product.slug}`;
    } else if (isInStock) {
      // Add basic product to cart
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(price),
        image: imageUrl,
        quantity: 1
      });
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  return (
    <div className={`product-card ${!isInStock ? 'out-of-stock' : ''}`}>
      <Link to={`/merch/${product.slug}`} className="product-link">
        <div className="product-image-container">
          {isImageLoading && (
            <div className="image-placeholder">
              <div className="loading-spinner-small"></div>
            </div>
          )}
          <img 
            src={imageError ? '/images/placeholder-product.jpg' : imageUrl} 
            alt={product.name} 
            className={`product-image ${isImageLoading ? 'loading' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {product.inventory_badge && (
            <span className="inventory-badge">{product.inventory_badge}</span>
          )}
          {!isInStock && (
            <div className="out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          {product.subtitle && (
            <p className="product-subtitle">{product.subtitle}</p>
          )}
          
          <div className="price-section">
            {price !== undefined && price !== null && (
              <p className="price">${getVariantPrice()}</p>
            )}
          </div>
          
          {product.variants && product.variants.length > 1 && (
            <p className="variant-count">
              {product.variants.length} options available
            </p>
          )}
        </div>
      </Link>
      
      <div className="product-actions">
        <button 
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${!isInStock ? 'disabled' : ''}`}
          disabled={!isInStock}
        >
          {!isInStock ? 'Out of Stock' : 
           product.variants && product.variants.length > 1 ? 'View Options' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

