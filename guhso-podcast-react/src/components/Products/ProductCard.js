import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const image = product.images?.[0]?.cdn_url_thumb;
  const price = product.base_price ?? product.price;

  return (
    <div className="product-card">
      <Link to={`/merch/${product.slug}`}>
        {image && <img src={image} alt={product.name} className="product-image" />}
        <h3>{product.name}</h3>
        {price !== undefined && (
          <p className="price">{'$'}{price}</p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;

