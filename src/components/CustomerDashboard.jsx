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

function CustomerDashboard() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    customer_id: "",
    name: "",
    age: "",
    loyalty_tier: "",
    location: "",
    household_size: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => {
        setCustomers(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      customer_id: formData.customer_id,
      name: formData.name,
      age: Number(formData.age),
      loyalty_tier: formData.loyalty_tier,
      location: formData.location,
      household_size: Number(formData.household_size),
    };

    if (formData._id) {
      axios
        .put(`http://localhost:5000/api/customers/${formData._id}`, payload)
        .then(() => {
          alert("Customer updated!");
          resetForm();
          fetchCustomers();
        })
        .catch((err) => console.error("Error updating customer:", err));
    } else {
      axios
        .post("http://localhost:5000/api/customers", payload)
        .then(() => {
          alert("Customer added!");
          resetForm();
          fetchCustomers();
        })
        .catch((err) => console.error("Error adding customer:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(`http://localhost:5000/api/customers/${id}`)
        .then(() => {
          alert("Customer deleted!");
          fetchCustomers();
        })
        .catch((err) => console.error("Error deleting customer:", err));
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      _id: customer._id || "",
      customer_id: customer.customer_id || "",
      name: customer.name || "",
      age: customer.age !== undefined ? String(customer.age) : "",
      loyalty_tier: customer.loyalty_tier || "",
      location: customer.location || "",
      household_size:
        customer.household_size !== undefined ? String(customer.household_size) : "",
    });
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      customer_id: "",
      name: "",
      age: "",
      loyalty_tier: "",
      location: "",
      household_size: "",
    });
  };

  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Customer List</h2>
          <button
            type="button"
            onClick={fetchCustomers}
            className={secondaryButtonClass}
          >
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Loading customers…</p>
        ) : customers.length === 0 ? (
          <p className="text-sm text-gray-500">No customers found. Start by adding a new record.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Customer ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Loyalty Tier</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Household Size</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="px-4 py-3 font-medium text-gray-700">{customer.customer_id}</td>
                    <td className="px-4 py-3 text-gray-700">{customer.name}</td>
                    <td className="px-4 py-3 text-gray-500">{customer.age}</td>
                    <td className="px-4 py-3 text-gray-500">{customer.loyalty_tier}</td>
                    <td className="px-4 py-3 text-gray-500">{customer.location}</td>
                    <td className="px-4 py-3 text-gray-500">{customer.household_size}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(customer)}
                          className={`${tableActionButton} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(customer._id)}
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
            {formData._id ? "Edit Customer" : "Add New Customer"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Capture the customer profile details used for loyalty segmentation.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="customer_id" className={labelClass}>
              Customer ID
            </label>
            <input
              id="customer_id"
              type="text"
              name="customer_id"
              value={formData.customer_id}
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
            <label htmlFor="age" className={labelClass}>
              Age
            </label>
            <input
              id="age"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={inputClass}
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="loyalty_tier" className={labelClass}>
              Loyalty Tier
            </label>
            <input
              id="loyalty_tier"
              type="text"
              name="loyalty_tier"
              value={formData.loyalty_tier}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="household_size" className={labelClass}>
              Household Size
            </label>
            <input
              id="household_size"
              type="number"
              name="household_size"
              value={formData.household_size}
              onChange={handleChange}
              className={inputClass}
              min="1"
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className={primaryButtonClass}>
              {formData._id ? "Update Customer" : "Add Customer"}
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

export default CustomerDashboard;
