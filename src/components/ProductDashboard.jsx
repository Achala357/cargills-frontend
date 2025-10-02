import { useEffect, useState } from "react";
import axios from "axios";

function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", // ✅ to track edits
    product_id: "",
    name: "",
    category: "",
    price: "",
    currency: "LKR",
    tags: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      tags: formData.tags.split(",").map(tag => tag.trim())
    };

    if (formData._id) {
      // UPDATE
      axios.put(`http://localhost:5000/api/products/${formData._id}`, productData)
        .then(() => {
          alert("Product updated!");
          resetForm();
          fetchProducts();
        })
        .catch(err => console.error("Error updating product:", err));
    } else {
      // CREATE
      axios.post("http://localhost:5000/api/products", productData)
        .then(() => {
          alert("Product added!");
          resetForm();
          fetchProducts();
        })
        .catch(err => console.error("Error adding product:", err));
    }
  };

  // ✅ Delete product
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product deleted!");
          fetchProducts();
        })
        .catch(err => console.error("Error deleting product:", err));
    }
  };

  // ✅ Load product into form for editing
  const handleEdit = (product) => {
    setFormData({
      ...product,
      tags: product.tags ? product.tags.join(", ") : "" // convert array back to comma-separated string
    });
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      product_id: "",
      name: "",
      category: "",
      price: "",
      currency: "LKR",
      tags: ""
    });
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-section">
        <h2 className="section-title">Product Catalogue</h2>
        <div className="card">
          {products.length === 0 ? (
            <p className="empty-state">No products found.</p>
          ) : (
            <ul className="data-list">
              {products.map(p => (
                <li key={p._id} className="data-card">
                  <div>
                    <span className="item-title">{p.name}</span>
                    <p className="item-meta">ID: {p.product_id} • Category: {p.category}</p>
                    <p className="item-meta">Price: {p.price} {p.currency} • Tags: {p.tags?.join ? p.tags.join(", ") : p.tags}</p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                    <button type="button" className="btn delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">{formData._id ? "Edit Product" : "Add Product"}</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="product_id"
              placeholder="Product ID"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
            />
            <div className="actions">
              <button type="submit" className="btn primary-btn">{formData._id ? "Update Product" : "Add Product"}</button>
              {formData._id && (
                <button type="button" className="btn secondary-btn" onClick={resetForm}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ProductDashboard;
