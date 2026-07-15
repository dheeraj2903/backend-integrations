import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css'; // Importing the separate CSS file
import PaymentButton from './PaymentButton';

function App() { 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products/get-item")
      .then(response => {
        setProduct(response.data.product);
        console.log(response.data.product);
      })
      .catch(error => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  // Format currency dynamically based on API response (e.g., INR -> ₹)
  const formatCurrency = (amount, currencyCode) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode || 'INR',
      maximumFractionDigits: 0
    }).format(amount / 100);
  };

  const handleBuyNow = () => {
    if (product) {
      alert(`Proceeding to checkout for item ID: ${product._id}`);
    }
  };

  return (
    <div className="container">
      <div className="product-card">
        
        {/* CONDITION 1: Render Skeleton Loader if data is fetching */}
        {!product ? (
          <div className="skeleton-view">
            <div className="image-container skeleton"></div>
            <div className="card-content">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text short"></div>
              <div className="skeleton-footer">
                <div className="skeleton skeleton-price"></div>
                <div className="skeleton skeleton-btn"></div>
              </div>
            </div>
          </div>
        ) : (
          
          /* CONDITION 2: Render Modern Seamless Card once data arrives */
          <div className="actual-view">
            <div className="image-container">
              <img 
                className="product-image" 
                src={product.image} 
                alt={product.title || "Product"} 
                loading="lazy"
              />
            </div>
            <div className="card-content">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              
              <div className="card-footer">
                <div className="price-tag">
                  <span className="price-label">Price</span>
                  <span className="price-value">
                    {formatCurrency(product.price?.amount, product.price?.currency)}
                  </span>
                </div>
                <button className="buy-btn" onClick={handleBuyNow}>
                  <PaymentButton />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;