import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/Products/ProductCard';
import './Merch.css';

const Merch = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const productList = Array.isArray(data.data) ? data.data : data;
        setProducts(productList);
        setFilteredProducts(productList);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      const price = parseFloat(priceFilter);
      if (priceFilter === 'under25') {
        filtered = filtered.filter(product => (product.base_price || product.price) < 25);
      } else if (priceFilter === '25to50') {
        filtered = filtered.filter(product => {
          const productPrice = product.base_price || product.price;
          return productPrice >= 25 && productPrice <= 50;
        });
      } else if (priceFilter === 'over50') {
        filtered = filtered.filter(product => (product.base_price || product.price) > 50);
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.base_price || a.price || 0) - (b.base_price || b.price || 0);
        case 'price-high':
          return (b.base_price || b.price || 0) - (a.base_price || a.price || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, priceFilter]);

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('name');
    setPriceFilter('all');
  };

  if (loading) {
    return (
      <div className="merch-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading merch...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="merch-page">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="merch-page">
      <div className="merch-header">
        <div className="hero-section">
          <h1>Guhso Merch Store</h1>
          <p>Show your support with official Guhso merchandise</p>
        </div>
        
        <div className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="price-filter"
            >
              <option value="all">All Prices</option>
              <option value="under25">Under $25</option>
              <option value="25to50">$25 - $50</option>
              <option value="over50">Over $50</option>
            </select>
            
            {(searchTerm || sortBy !== 'name' || priceFilter !== 'all') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="results-info">
          <p>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Merch;

