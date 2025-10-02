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

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div>
      <h2>Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <ul>
          {customers.map(c => (
            <li key={c._id}>
              <strong>{c.name}</strong> — {c.customer_id} ({c.loyalty_tier})
              <button onClick={() => handleEdit(c)}>Edit</button>
              <button onClick={() => handleDelete(c._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h2>{formData._id ? "Edit Customer" : "Add New Customer"}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">
          {formData._id ? "Update Customer" : "Add Customer"}
        </button>
        {formData._id && <button onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
}

export default CustomerDashboard;
