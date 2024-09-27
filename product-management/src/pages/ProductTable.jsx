import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://api.example.com/products')
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error("There was an error fetching the products:", error);
        alert('Failed to load products');
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://api.example.com/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully');
      })
      .catch(error => console.log('Error deleting product:', error));
  };

  const filteredProducts = products.filter(product =>
    product.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.title || 'N/A'}</td>
                <td>{product.price || 'N/A'}</td>
                <td>{product.category || 'N/A'}</td>
                <td>
                  <button onClick={() => console.log(product)}>View</button>
                  <button onClick={() => console.log('Update product', product)}>Update</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
