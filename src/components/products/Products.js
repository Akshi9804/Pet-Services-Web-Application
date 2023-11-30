import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'
function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('http://localhost:4089/products/get-products')
      .then((response) => {
        if (response.status === 201) { // Check for 200 (OK) status, not 201
          setProducts(response.data.payload);
        } else {
          setError("Error fetching products");
        }
      })
      .catch(err => {
        setError("Error: " + err.message);
      });
  }, []);

  return (
    <div>
      {error && <p className='display-5 text-center'>{error}</p>}
      {products.length === 0 && <p className='display-5 text-center mt-5'>No products available</p>}
      <div className='row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
        {products.map((item, index) => (
          <div className='col' key={index}>
            <div className='card'>
              <img src={item.image} alt="Image not available" />
              <p><span>{item.brand} {item.name}</span></p>
              <p>Rs. {item.price}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Products;