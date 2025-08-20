import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/Products/ProductCard';
import './Merch.css';

const Merch = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        // If API returns {data: [...]}, normalize
        setProducts(Array.isArray(data.data) ? data.data : data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="merch-page">Error: {error}</div>;
  }

  return (
    <div className="merch-page">
      <h1>Merch</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default Merch;

