import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => {
        console.error("There was an error fetching the products:", error);
        alert('Failed to load products');
      });
  }, []);

  const handleDelete = (id) => {
   
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully');
      })
      .catch(error => console.log('Error deleting product:', error));
  };

  const handleUpdate = (product) => {
 
    axios.put(`https://fakestoreapi.com/products/${product.id}`, product)
      .then(() => {
        const updatedProducts = products.map(p => p.id === product.id ? product : p);
        setProducts(updatedProducts);
        setUpdateProduct(null);  
        alert('Product updated successfully');
      })
      .catch(error => console.log('Error updating product:', error));
  };

  const filteredProducts = products.filter(product => {
    const matchesQuery = product.title?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesQuery && matchesCategory;
  });

  const openPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-4">
    
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


      <select
        className="form-select mb-3"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

     
      <table className="table table-striped">
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
                  <button className="btn btn-primary btn-sm me-2" onClick={() => openPopup(product)}>View</button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => setUpdateProduct(product)}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </table>

  
      {isPopupOpen && selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h2>Product Details</h2>
            <p><strong>Title:</strong> {selectedProduct.title}</p>
            <p><strong>Price:</strong> {selectedProduct.price}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <button className="btn btn-secondary" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}

  
      {updateProduct && (
        <div className="update-form">
          <h2>Update Product</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(updateProduct);
            }}
          >
            <input
              type="text"
              className="form-control mb-2"
              value={updateProduct.title}
              onChange={(e) => setUpdateProduct({ ...updateProduct, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={updateProduct.price}
              onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
              placeholder="Price"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={updateProduct.category}
              onChange={(e) => setUpdateProduct({ ...updateProduct, category: e.target.value })}
              placeholder="Category"
            />
            <textarea
              className="form-control mb-2"
              value={updateProduct.description}
              onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
              placeholder="Description"
            ></textarea>
            <button type="submit" className="btn btn-success me-2">Update</button>
            <button className="btn btn-secondary" onClick={() => setUpdateProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
