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

function TransactionDashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: "",
    transaction_id: "",
    customer_id: "",
    product_id: "",
    qty: "",
    price: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    axios
      .get("http://localhost:5000/api/transactions")
      .then((res) => {
        setTransactions(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const lineTotal = Number(formData.qty) * Number(formData.price);

    const transactionData = {
      transaction_id: formData.transaction_id,
      customer_id: formData.customer_id,
      items: [
        {
          product_id: formData.product_id,
          qty: Number(formData.qty),
          price: Number(formData.price),
          line_total: lineTotal,
        },
      ],
      total: lineTotal,
      date: new Date().toISOString(),
    };

    if (formData._id) {
      axios
        .put(`http://localhost:5000/api/transactions/${formData._id}`, transactionData)
        .then(() => {
          alert("Transaction updated!");
          resetForm();
          fetchTransactions();
        })
        .catch((err) => console.error("Error updating transaction:", err));
    } else {
      axios
        .post("http://localhost:5000/api/transactions", transactionData)
        .then(() => {
          alert("Transaction added!");
          resetForm();
          fetchTransactions();
        })
        .catch((err) => console.error("Error adding transaction:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      axios
        .delete(`http://localhost:5000/api/transactions/${id}`)
        .then(() => {
          alert("Transaction deleted!");
          fetchTransactions();
        })
        .catch((err) => console.error("Error deleting transaction:", err));
    }
  };

  const handleEdit = (transaction) => {
    const firstItem = transaction.items && transaction.items[0] ? transaction.items[0] : {};

    setFormData({
      _id: transaction._id || "",
      transaction_id: transaction.transaction_id || "",
      customer_id: transaction.customer_id || "",
      product_id: firstItem.product_id || "",
      qty: firstItem.qty !== undefined ? String(firstItem.qty) : "",
      price: firstItem.price !== undefined ? String(firstItem.price) : "",
    });
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      transaction_id: "",
      customer_id: "",
      product_id: "",
      qty: "",
      price: "",
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
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          {loading ? (
            <span className="text-xs font-medium text-blue-600">Loading…</span>
          ) : (
            <span className="text-xs font-medium text-gray-500">{transactions.length} records</span>
          )}
        </div>
        {loading ? (
          <p className="text-sm text-gray-500">Fetching transaction history…</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions available yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {transactions.map((transaction) => {
                  const firstItem = transaction.items && transaction.items[0] ? transaction.items[0] : {};

                  return (
                    <tr key={transaction._id}>
                      <td className="px-4 py-3 font-medium text-gray-700">{transaction.transaction_id}</td>
                      <td className="px-4 py-3 text-gray-700">{transaction.customer_id}</td>
                      <td className="px-4 py-3 text-gray-500">{firstItem.product_id || "—"}</td>
                      <td className="px-4 py-3 text-gray-500">{firstItem.qty ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-500">{firstItem.price ?? "—"}</td>
                      <td className="px-4 py-3 text-gray-700">{Number(transaction.total || 0).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(transaction.date)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(transaction)}
                            className={`${tableActionButton} bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(transaction._id)}
                            className={`${tableActionButton} bg-red-500 hover:bg-red-600 focus:ring-red-500`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {formData._id ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">Log purchases for downstream analytics and offer evaluation.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="transaction_id" className={labelClass}>
              Transaction ID
            </label>
            <input
              id="transaction_id"
              type="text"
              name="transaction_id"
              value={formData.transaction_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
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
            <label htmlFor="product_id" className={labelClass}>
              Product ID
            </label>
            <input
              id="product_id"
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="qty" className={labelClass}>
              Quantity
            </label>
            <input
              id="qty"
              type="number"
              name="qty"
              value={formData.qty}
              onChange={handleChange}
              className={inputClass}
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className={labelClass}>
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className={primaryButtonClass}>
              {formData._id ? "Update Transaction" : "Add Transaction"}
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

export default TransactionDashboard;
