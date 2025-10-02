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
    <div>
      <h2>Offers</h2>
      {offers.length === 0 ? (
        <p>No offers found.</p>
      ) : (
        <ul>
          {offers.map(o => (
            <li key={o._id}>
              {o.offer_id} — {o.description} — Valid until: {o.valid_until}
              <button onClick={() => handleEdit(o)}>Edit</button>
              <button onClick={() => handleDelete(o._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h3>{formData._id ? "Edit Offer" : "Add Offer"}</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="offer_id" placeholder="Offer ID" value={formData.offer_id} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="date" name="valid_until" placeholder="Valid Until" value={formData.valid_until} onChange={handleChange} required />
        <input type="text" name="eligible_tiers" placeholder="Eligible Tiers (comma-separated)" value={formData.eligible_tiers} onChange={handleChange} required />
        <input type="text" name="category_scope" placeholder="Category Scope (comma-separated)" value={formData.category_scope} onChange={handleChange} required />
        <button type="submit">{formData._id ? "Update Offer" : "Add Offer"}</button>
        {formData._id && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
}

export default OfferDashboard;
