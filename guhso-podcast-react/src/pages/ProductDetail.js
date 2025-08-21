import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductBySlug } from '../api';
import { useCart } from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        // Auto-select first available variant
        if (data.variants && data.variants.length > 0) {
          const firstAvailable = data.variants.find(v => v.stock_qty > 0) || data.variants[0];
          setSelectedVariant(firstAvailable);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    try {
      const cartItem = {
        id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
        productId: product.id,
        variantId: selectedVariant?.id,
        name: product.name,
        price: selectedVariant?.price || product.base_price || product.price,
        image: getMainImage(),
        quantity: quantity,
        variant: selectedVariant ? {
          color: selectedVariant.color?.name,
          size: selectedVariant.size?.name,
          sku: selectedVariant.sku
        } : null
      };
      
      addToCart(cartItem);
      
      // Show success feedback (you could add a toast notification here)
      setTimeout(() => setAddingToCart(false), 1000);
    } catch (err) {
      setAddingToCart(false);
      console.error('Error adding to cart:', err);
    }
  };

  const getMainImage = () => {
    if (!product?.images?.length) return '/images/placeholder-product.jpg';
    
    const image = product.images[selectedImage];
    return image?.urls?.medium || image?.cdn_url_md || image?.cdn_url_lg || '/images/placeholder-product.jpg';
  };

  const getCurrentPrice = () => {
    const price = selectedVariant?.price || product?.base_price || product?.price || 0;
    return parseFloat(price);
  };

  const isInStock = () => {
    if (selectedVariant) {
      return selectedVariant.stock_qty > 0;
    }
    return product?.in_stock !== false && (product?.total_stock === undefined || product?.total_stock > 0);
  };

  const getStockMessage = () => {
    if (selectedVariant) {
      if (selectedVariant.stock_qty === 0) return 'Out of Stock';
      if (selectedVariant.stock_qty <= 5) return `Only ${selectedVariant.stock_qty} left in stock`;
      return 'In Stock';
    }
    return 'In Stock';
  };

  // Loading State
  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="product-detail-page">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>Error: {error}</p>
          <Link to="/merch" className="back-to-merch-btn">
            ← Back to Merch Store
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/merch">Merch</Link>
        <span className="breadcrumb-separator">›</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={getMainImage()} 
              alt={product.name}
              className="main-image"
            />
            {product.inventory_badge && (
              <span className="inventory-badge">{product.inventory_badge}</span>
            )}
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-gallery">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image?.urls?.thumbnail || image?.cdn_url_thumb || image?.cdn_url_sm}
                    alt={`${product.name} view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            {product.subtitle && (
              <p className="product-subtitle">{product.subtitle}</p>
            )}
            
            <div className="price-section">
              <span className="current-price">${getCurrentPrice().toFixed(2)}</span>
              <span className={`stock-status ${isInStock() ? 'in-stock' : 'out-of-stock'}`}>
                {getStockMessage()}
              </span>
            </div>
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="variant-selection">
              {/* Color Selection */}
              {product.variants.some(v => v.color) && (
                <div className="variant-group">
                  <label className="variant-label">Color:</label>
                  <div className="color-options">
                    {[...new Set(product.variants.map(v => v.color?.id))].map(colorId => {
                      const colorVariant = product.variants.find(v => v.color?.id === colorId);
                      const isSelected = selectedVariant?.color?.id === colorId;
                      const isAvailable = product.variants.some(v => v.color?.id === colorId && v.stock_qty > 0);
                      
                      return (
                        <button
                          key={colorId}
                          className={`color-option ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                          onClick={() => {
                            if (isAvailable) {
                              const variant = product.variants.find(v => 
                                v.color?.id === colorId && 
                                (!selectedVariant?.size || v.size?.id === selectedVariant.size.id)
                              ) || product.variants.find(v => v.color?.id === colorId && v.stock_qty > 0);
                              handleVariantSelect(variant);
                            }
                          }}
                          disabled={!isAvailable}
                          style={{ backgroundColor: colorVariant?.color?.hex_code }}
                          title={colorVariant?.color?.name}
                        >
                          <span className="color-name">{colorVariant?.color?.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.variants.some(v => v.size) && (
                <div className="variant-group">
                  <label className="variant-label">Size:</label>
                  <div className="size-options">
                    {[...new Set(product.variants.map(v => v.size?.id))].map(sizeId => {
                      const sizeVariant = product.variants.find(v => v.size?.id === sizeId);
                      const isSelected = selectedVariant?.size?.id === sizeId;
                      const isAvailable = product.variants.some(v => 
                        v.size?.id === sizeId && 
                        v.stock_qty > 0 &&
                        (!selectedVariant?.color || v.color?.id === selectedVariant.color.id)
                      );
                      
                      return (
                        <button
                          key={sizeId}
                          className={`size-option ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                          onClick={() => {
                            if (isAvailable) {
                              const variant = product.variants.find(v => 
                                v.size?.id === sizeId && 
                                (!selectedVariant?.color || v.color?.id === selectedVariant.color.id) &&
                                v.stock_qty > 0
                              );
                              handleVariantSelect(variant);
                            }
                          }}
                          disabled={!isAvailable}
                        >
                          {sizeVariant?.size?.name || sizeVariant?.size?.abbreviation}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input 
                  type="number" 
                  id="quantity"
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={selectedVariant?.stock_qty || 99}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                  disabled={selectedVariant && quantity >= selectedVariant.stock_qty}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isInStock() || addingToCart}
              className={`add-to-cart-btn ${!isInStock() ? 'disabled' : ''} ${addingToCart ? 'loading' : ''}`}
            >
              {addingToCart ? 'Adding...' : !isInStock() ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="product-description">
              <h3>Description</h3>
              <div className="description-content">
                {product.description}
              </div>
            </div>
          )}

          {/* Product Details */}
          {product.details && (
            <div className="product-details">
              <h3>Details</h3>
              <div className="details-content">
                {product.details}
              </div>
            </div>
          )}

          {/* Care Instructions */}
          {product.care && (
            <div className="product-care">
              <h3>Care Instructions</h3>
              <div className="care-content">
                {product.care}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

