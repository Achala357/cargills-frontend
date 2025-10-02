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
    <div>
      <h2>Stores Dashboard</h2>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">{form._id ? "Update Store" : "Add Store"}</button>
        {form._id && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>

      <h3>All Stores</h3>
      <ul>
        {stores.map((s) => (
          <li key={s._id}>
            {s.store_id} — {s.name} ({s.location})
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoreDashboard;
