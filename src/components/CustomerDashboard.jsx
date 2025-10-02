import { useEffect, useState } from "react";
import axios from "axios";

function CustomerDashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",            // ✅ added _id so we can track editing
    customer_id: "",
    name: "",
    age: "",
    loyalty_tier: "",
    location: "",
    household_size: ""
  });

  // Fetch customers on load
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get("http://localhost:5000/api/customers")
      .then(res => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData._id) {
      // ✅ UPDATE
      axios.put(`http://localhost:5000/api/customers/${formData._id}`, formData)
        .then(() => {
          alert("Customer updated!");
          resetForm();
          fetchCustomers();
        })
        .catch(err => console.error("Error updating customer:", err));
    } else {
      // ✅ CREATE
      axios.post("http://localhost:5000/api/customers", formData)
        .then(() => {
          alert("Customer added!");
          resetForm();
          fetchCustomers();
        })
        .catch(err => console.error("Error adding customer:", err));
    }
  };

  // ✅ Delete customer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios.delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => {
          alert("Customer deleted!");
          fetchCustomers();
        })
        .catch(err => console.error("Error deleting customer:", err));
    }
  };

  // ✅ Load a customer into form for editing
  const handleEdit = (customer) => {
    setFormData(customer);
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      customer_id: "",
      name: "",
      age: "",
      loyalty_tier: "",
      location: "",
      household_size: ""
    });
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-section">
        <h2 className="section-title">Customer List</h2>
        <div className="card">
          {loading ? (
            <p className="empty-state">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="empty-state">No customers found.</p>
          ) : (
            <ul className="data-list">
              {customers.map(c => (
                <li key={c._id} className="data-card">
                  <div>
                    <span className="item-title">{c.name}</span>
                    <p className="item-meta">ID: {c.customer_id} • Tier: {c.loyalty_tier}</p>
                    <p className="item-meta">Location: {c.location} • Household Size: {c.household_size}</p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn edit-btn" onClick={() => handleEdit(c)}>Edit</button>
                    <button type="button" className="btn delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">{formData._id ? "Edit Customer" : "Add New Customer"}</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="customer_id"
              placeholder="Customer ID"
              value={formData.customer_id}
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
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="loyalty_tier"
              placeholder="Loyalty Tier"
              value={formData.loyalty_tier}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="household_size"
              placeholder="Household Size"
              value={formData.household_size}
              onChange={handleChange}
              required
            />
            <div className="actions">
              <button type="submit" className="btn primary-btn">
                {formData._id ? "Update Customer" : "Add Customer"}
              </button>
              {formData._id && (
                <button type="button" className="btn secondary-btn" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CustomerDashboard;
