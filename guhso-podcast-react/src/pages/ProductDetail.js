import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductBySlug } from '../api';
import { useCart } from '../contexts/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [slug]);

  if (error) {
    return <div className="product-detail">Error: {error}</div>;
  }

  if (!product) {
    return <div className="product-detail">Loading...</div>;
  }

  const image = product.images?.[0]?.cdn_url_md;
  const price = product.base_price ?? product.price;

  return (
    <div className="product-detail">
      {image && <img src={image} alt={product.name} className="detail-image" />}
      <div className="detail-info">
        <h1>{product.name}</h1>
        {price !== undefined && <p className="price">{'$'}{price}</p>}
        {product.description_md && <p>{product.description_md}</p>}
        <button
          className="add-cart-btn"
          onClick={() => addToCart({ id: product.id, name: product.name, price })}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

