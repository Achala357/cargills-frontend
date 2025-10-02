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

function StoreDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    _id: "",
    store_id: "",
    name: "",
    location: "",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = () => {
    axios
      .get("http://localhost:5000/api/stores")
      .then((res) => {
        setStores(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form._id) {
      axios
        .put(`http://localhost:5000/api/stores/${form._id}`, form)
        .then(() => {
          alert("Store updated!");
          resetForm();
          fetchStores();
        })
        .catch((err) => console.error("Error updating store:", err));
    } else {
      axios
        .post("http://localhost:5000/api/stores", form)
        .then(() => {
          alert("Store added!");
          resetForm();
          fetchStores();
        })
        .catch((err) => console.error("Error adding store:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      axios
        .delete(`http://localhost:5000/api/stores/${id}`)
        .then(() => {
          alert("Store deleted!");
          fetchStores();
        })
        .catch((err) => console.error("Error deleting store:", err));
    }
  };

  const handleEdit = (store) => {
    setForm({
      _id: store._id || "",
      store_id: store.store_id || "",
      name: store.name || "",
      location: store.location || "",
    });
  };

  const resetForm = () => {
    setForm({
      _id: "",
      store_id: "",
      name: "",
      location: "",
    });
  };

  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Store Directory</h2>
          {loading ? (
            <span className="text-xs font-medium text-blue-600">Loading…</span>
          ) : (
            <span className="text-xs font-medium text-gray-500">{stores.length} stores</span>
          )}
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Gathering store list…</p>
        ) : stores.length === 0 ? (
          <p className="text-sm text-gray-500">No stores recorded. Add your first location below.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Store ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {stores.map((store) => (
                  <tr key={store._id}>
                    <td className="px-4 py-3 font-medium text-gray-700">{store.store_id}</td>
                    <td className="px-4 py-3 text-gray-700">{store.name}</td>
                    <td className="px-4 py-3 text-gray-500">{store.location}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(store)}
                          className={`${tableActionButton} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(store._id)}
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
            {form._id ? "Edit Store" : "Add Store"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Maintain store metadata for regional performance analysis.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="store_id" className={labelClass}>
              Store ID
            </label>
            <input
              id="store_id"
              type="text"
              name="store_id"
              value={form.store_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="name" className={labelClass}>
              Store Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className={primaryButtonClass}>
              {form._id ? "Update Store" : "Add Store"}
            </button>
            {form._id && (
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

export default StoreDashboard;
