import { useEffect, useState } from "react";
import axios from "axios";

function OfferDashboard() {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", // ✅ track edit
    offer_id: "",
    description: "",
    valid_until: "",
    eligible_tiers: "",
    category_scope: ""
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    axios.get("http://localhost:5000/api/offers")
      .then(res => setOffers(res.data))
      .catch(err => console.error("Error fetching offers:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    const offerData = {
      ...formData,
      eligible_tiers: formData.eligible_tiers.split(",").map(t => t.trim()),
      category_scope: formData.category_scope.split(",").map(c => c.trim())
    };

    if (formData._id) {
      // UPDATE
      axios.put(`http://localhost:5000/api/offers/${formData._id}`, offerData)
        .then(() => {
          alert("Offer updated!");
          resetForm();
          fetchOffers();
        })
        .catch(err => console.error("Error updating offer:", err));
    } else {
      // CREATE
      axios.post("http://localhost:5000/api/offers", offerData)
        .then(() => {
          alert("Offer added!");
          resetForm();
          fetchOffers();
        })
        .catch(err => console.error("Error adding offer:", err));
    }
  };

  // ✅ Delete offer
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      axios.delete(`http://localhost:5000/api/offers/${id}`)
        .then(() => {
          alert("Offer deleted!");
          fetchOffers();
        })
        .catch(err => console.error("Error deleting offer:", err));
    }
  };

  // ✅ Load offer into form for editing
  const handleEdit = (offer) => {
    setFormData({
      ...offer,
      eligible_tiers: offer.eligible_tiers ? offer.eligible_tiers.join(", ") : "",
      category_scope: offer.category_scope ? offer.category_scope.join(", ") : ""
    });
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      offer_id: "",
      description: "",
      valid_until: "",
      eligible_tiers: "",
      category_scope: ""
    });
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-section">
        <h2 className="section-title">Active Offers</h2>
        <div className="card">
          {offers.length === 0 ? (
            <p className="empty-state">No offers found.</p>
          ) : (
            <ul className="data-list">
              {offers.map(o => (
                <li key={o._id} className="data-card">
                  <div>
                    <span className="item-title">{o.offer_id}</span>
                    <p className="item-meta">{o.description}</p>
                    <p className="item-meta">Valid until: {o.valid_until}</p>
                    <p className="item-meta">Eligible Tiers: {Array.isArray(o.eligible_tiers) ? o.eligible_tiers.join(", ") : o.eligible_tiers}</p>
                    <p className="item-meta">Categories: {Array.isArray(o.category_scope) ? o.category_scope.join(", ") : o.category_scope}</p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn edit-btn" onClick={() => handleEdit(o)}>Edit</button>
                    <button type="button" className="btn delete-btn" onClick={() => handleDelete(o._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">{formData._id ? "Edit Offer" : "Add Offer"}</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="offer_id"
              placeholder="Offer ID"
              value={formData.offer_id}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="valid_until"
              placeholder="Valid Until"
              value={formData.valid_until}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="eligible_tiers"
              placeholder="Eligible Tiers (comma-separated)"
              value={formData.eligible_tiers}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category_scope"
              placeholder="Category Scope (comma-separated)"
              value={formData.category_scope}
              onChange={handleChange}
              required
            />
            <div className="actions">
              <button type="submit" className="btn primary-btn">{formData._id ? "Update Offer" : "Add Offer"}</button>
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

export default OfferDashboard;
