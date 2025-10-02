import { useEffect, useState } from "react";
import axios from "axios";

const inputClass =
  "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
const labelClass = "text-sm font-medium text-gray-700";
const tableActionButton =
  "inline-flex items-center rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
const primaryButtonClass =
  "inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2";

function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    product_id: "",
    name: "",
    category: "",
    price: "",
    currency: "LKR",
    tags: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const tags = formData.tags
      ? formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

    const productData = {
      product_id: formData.product_id,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      currency: formData.currency,
      tags,
    };

    if (formData._id) {
      axios
        .put(`http://localhost:5000/api/products/${formData._id}`, productData)
        .then(() => {
          alert("Product updated!");
          resetForm();
          fetchProducts();
        })
        .catch((err) => console.error("Error updating product:", err));
    } else {
      axios
        .post("http://localhost:5000/api/products", productData)
        .then(() => {
          alert("Product added!");
          resetForm();
          fetchProducts();
        })
        .catch((err) => console.error("Error adding product:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product deleted!");
          fetchProducts();
        })
        .catch((err) => console.error("Error deleting product:", err));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      _id: product._id || "",
      product_id: product.product_id || "",
      name: product.name || "",
      category: product.category || "",
      price: product.price !== undefined ? String(product.price) : "",
      currency: product.currency || "LKR",
      tags: product.tags ? product.tags.join(", ") : "",
    });
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      product_id: "",
      name: "",
      category: "",
      price: "",
      currency: "LKR",
      tags: "",
    });
  };

  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Product Catalogue</h2>
          <span className="text-xs font-medium text-gray-500">{products.length} items</span>
        </div>
        {products.length === 0 ? (
          <p className="text-sm text-gray-500">No products found. Add a product to populate the catalogue.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Product ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Tags</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-3 font-medium text-gray-700">{product.product_id}</td>
                    <td className="px-4 py-3 text-gray-700">{product.name}</td>
                    <td className="px-4 py-3 text-gray-500">{product.category}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {Number(product.price).toLocaleString()} {product.currency}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {product.tags && product.tags.length > 0 ? product.tags.join(", ") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className={`${tableActionButton} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className={`${tableActionButton} bg-red-500 hover:bg-red-600 focus:ring-red-500`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {formData._id ? "Edit Product" : "Add Product"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Maintain product attributes that power offer targeting.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="product_id" className={labelClass}>
              Product ID
            </label>
            <input
              id="product_id"
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className={labelClass}>
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className={labelClass}>
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="currency" className={labelClass}>
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="tags" className={labelClass}>
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className={primaryButtonClass}>
              {formData._id ? "Update Product" : "Add Product"}
            </button>
            {formData._id && (
              <button type="button" onClick={resetForm} className={secondaryButtonClass}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

export default ProductDashboard;
