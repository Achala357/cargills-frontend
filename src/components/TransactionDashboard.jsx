import { useEffect, useState } from "react";
import axios from "axios";

function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    _id: "", // ✅ track edit
    transaction_id: "",
    customer_id: "",
    product_id: "",
    qty: "",
    price: ""
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Error fetching transactions:", err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const line_total = Number(formData.qty) * Number(formData.price);
    const transactionData = {
      transaction_id: formData.transaction_id,
      customer_id: formData.customer_id,
      items: [
        {
          product_id: formData.product_id,
          qty: Number(formData.qty),
          price: Number(formData.price),
          line_total: line_total
        }
      ],
      total: line_total,
      date: new Date().toISOString()
    };

    if (formData._id) {
      // UPDATE
      axios.put(`http://localhost:5000/api/transactions/${formData._id}`, transactionData)
        .then(() => {
          alert("Transaction updated!");
          resetForm();
          fetchTransactions();
        })
        .catch(err => console.error("Error updating transaction:", err));
    } else {
      // CREATE
      axios.post("http://localhost:5000/api/transactions", transactionData)
        .then(() => {
          alert("Transaction added!");
          resetForm();
          fetchTransactions();
        })
        .catch(err => console.error("Error adding transaction:", err));
    }
  };

  // ✅ Delete transaction
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios.delete(`http://localhost:5000/api/transactions/${id}`)
        .then(() => {
          alert("Transaction deleted!");
          fetchTransactions();
        })
        .catch(err => console.error("Error deleting transaction:", err));
    }
  };

  // ✅ Load transaction into form for editing
  const handleEdit = (transaction) => {
    const firstItem = transaction.items[0] || {}; // only handle the first item for simplicity
    setFormData({
      _id: transaction._id,
      transaction_id: transaction.transaction_id,
      customer_id: transaction.customer_id,
      product_id: firstItem.product_id || "",
      qty: firstItem.qty || "",
      price: firstItem.price || ""
    });
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      transaction_id: "",
      customer_id: "",
      product_id: "",
      qty: "",
      price: ""
    });
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-section">
        <h2 className="section-title">Recent Transactions</h2>
        <div className="card">
          {transactions.length === 0 ? (
            <p className="empty-state">No transactions found.</p>
          ) : (
            <ul className="data-list">
              {transactions.map(t => (
                <li key={t._id} className="data-card">
                  <div>
                    <span className="item-title">{t.transaction_id}</span>
                    <p className="item-meta">Customer: {t.customer_id}</p>
                    <p className="item-meta">Total: Rs.{t.total}</p>
                  </div>
                  <div className="actions">
                    <button type="button" className="btn edit-btn" onClick={() => handleEdit(t)}>Edit</button>
                    <button type="button" className="btn delete-btn" onClick={() => handleDelete(t._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">{formData._id ? "Edit Transaction" : "Add Transaction"}</h2>
        <div className="card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="transaction_id"
              placeholder="Transaction ID"
              value={formData.transaction_id}
              onChange={handleChange}
              required
            />
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
              name="product_id"
              placeholder="Product ID"
              value={formData.product_id}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="qty"
              placeholder="Quantity"
              value={formData.qty}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <div className="actions">
              <button type="submit" className="btn primary-btn">{formData._id ? "Update Transaction" : "Add Transaction"}</button>
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

export default TransactionDashboard;
