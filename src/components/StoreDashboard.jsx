import { useEffect, useState } from "react";
import axios from "axios";

function StoreDashboard() {
  const [stores, setStores] = useState([]);
  const [form, setForm] = useState({
    _id: "", // ✅ track edits
    store_id: "",
    name: "",
    location: ""
  });

  // fetch stores
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = () => {
    axios.get("http://localhost:5000/api/stores")
      .then(res => setStores(res.data))
      .catch(err => console.error(err));
  };

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ submit form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form._id) {
      // UPDATE
      axios.put(`http://localhost:5000/api/stores/${form._id}`, form)
        .then(res => {
          alert("Store updated!");
          resetForm();
          fetchStores();
        })
        .catch(err => console.error("Error updating store:", err));
    } else {
      // CREATE
      axios.post("http://localhost:5000/api/stores", form)
        .then(res => {
          setStores([...stores, res.data]);
          resetForm();
        })
        .catch(err => console.error("Error adding store:", err));
    }
  };

  // ✅ delete store
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      axios.delete(`http://localhost:5000/api/stores/${id}`)
        .then(() => {
          alert("Store deleted!");
          fetchStores();
        })
        .catch(err => console.error("Error deleting store:", err));
    }
  };

  // ✅ load store into form for editing
  const handleEdit = (store) => {
    setForm(store);
  };

  // ✅ reset form
  const resetForm = () => {
    setForm({
      _id: "",
      store_id: "",
      name: "",
      location: ""
    });
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-section">
        <h2 className="section-title">All Stores</h2>
        <div className="card">
          {stores.length === 0 ? (
            <p className="empty-state">No stores found.</p>
          ) : (
            <ul className="data-list">
              {stores.map((s) => (
                <li key={s._id} className="data-card">
                  <div>
                    <span className="item-title">{s.name}</span>
                    <p className="item-meta">ID: {s.store_id} • Location: {s.location}</p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                    <button type="button" className="btn delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">{form._id ? "Edit Store" : "Add Store"}</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="store_id"
              placeholder="Store ID"
              value={form.store_id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Store Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <div className="actions">
              <button type="submit" className="btn primary-btn">{form._id ? "Update Store" : "Add Store"}</button>
              {form._id && (
                <button type="button" className="btn secondary-btn" onClick={resetForm}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default StoreDashboard;
