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

function OfferDashboard() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    offer_id: "",
    description: "",
    valid_until: "",
    eligible_tiers: "",
    category_scope: "",
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = () => {
    axios
      .get("http://localhost:5000/api/offers")
      .then((res) => {
        setOffers(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching offers:", err);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const eligibleTiers = formData.eligible_tiers
      ? formData.eligible_tiers.split(",").map((tier) => tier.trim()).filter(Boolean)
      : [];
    const categoryScope = formData.category_scope
      ? formData.category_scope.split(",").map((category) => category.trim()).filter(Boolean)
      : [];

    const offerData = {
      offer_id: formData.offer_id,
      description: formData.description,
      valid_until: formData.valid_until,
      eligible_tiers: eligibleTiers,
      category_scope: categoryScope,
    };

    if (formData._id) {
      axios
        .put(`http://localhost:5000/api/offers/${formData._id}`, offerData)
        .then(() => {
          alert("Offer updated!");
          resetForm();
          fetchOffers();
        })
        .catch((err) => console.error("Error updating offer:", err));
    } else {
      axios
        .post("http://localhost:5000/api/offers", offerData)
        .then(() => {
          alert("Offer added!");
          resetForm();
          fetchOffers();
        })
        .catch((err) => console.error("Error adding offer:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      axios
        .delete(`http://localhost:5000/api/offers/${id}`)
        .then(() => {
          alert("Offer deleted!");
          fetchOffers();
        })
        .catch((err) => console.error("Error deleting offer:", err));
    }
  };

  const handleEdit = (offer) => {
    setFormData({
      _id: offer._id || "",
      offer_id: offer.offer_id || "",
      description: offer.description || "",
      valid_until: offer.valid_until ? offer.valid_until.substring(0, 10) : "",
      eligible_tiers: offer.eligible_tiers ? offer.eligible_tiers.join(", ") : "",
      category_scope: offer.category_scope ? offer.category_scope.join(", ") : "",
    });
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      offer_id: "",
      description: "",
      valid_until: "",
      eligible_tiers: "",
      category_scope: "",
    });
  };

  const formatDate = (value) => {
    if (!value) return "—";
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  };

  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Active Offers</h2>
          {loading ? (
            <span className="text-xs font-medium text-blue-600">Loading…</span>
          ) : (
            <span className="text-xs font-medium text-gray-500">{offers.length} offers</span>
          )}
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Retrieving current offers…</p>
        ) : offers.length === 0 ? (
          <p className="text-sm text-gray-500">No offers configured yet. Add one below to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Offer ID</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Valid Until</th>
                  <th className="px-4 py-3">Eligible Tiers</th>
                  <th className="px-4 py-3">Categories</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {offers.map((offer) => (
                  <tr key={offer._id}>
                    <td className="px-4 py-3 font-medium text-gray-700">{offer.offer_id}</td>
                    <td className="px-4 py-3 text-gray-700">{offer.description}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(offer.valid_until)}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {offer.eligible_tiers && offer.eligible_tiers.length > 0
                        ? offer.eligible_tiers.join(", ")
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {offer.category_scope && offer.category_scope.length > 0
                        ? offer.category_scope.join(", ")
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(offer)}
                          className={`${tableActionButton} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(offer._id)}
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
            {formData._id ? "Edit Offer" : "Add Offer"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Define promotion parameters to target the right customer tiers.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="offer_id" className={labelClass}>
              Offer ID
            </label>
            <input
              id="offer_id"
              type="text"
              name="offer_id"
              value={formData.offer_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="valid_until" className={labelClass}>
              Valid Until
            </label>
            <input
              id="valid_until"
              type="date"
              name="valid_until"
              value={formData.valid_until}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="eligible_tiers" className={labelClass}>
              Eligible Tiers
            </label>
            <input
              id="eligible_tiers"
              type="text"
              name="eligible_tiers"
              placeholder="e.g. Gold, Silver"
              value={formData.eligible_tiers}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="category_scope" className={labelClass}>
              Category Scope
            </label>
            <input
              id="category_scope"
              type="text"
              name="category_scope"
              placeholder="e.g. Dairy, Fresh Food"
              value={formData.category_scope}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className={primaryButtonClass}>
              {formData._id ? "Update Offer" : "Add Offer"}
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

export default OfferDashboard;
