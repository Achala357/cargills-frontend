import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

function AnalyticsPage() {
  // states for all analytics
  const [tierCount, setTierCount] = useState([]);
  const [salesByStore, setSalesByStore] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [avgBasket, setAvgBasket] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);
  const [categorySpend, setCategorySpend] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);
  const [churnRisk, setChurnRisk] = useState([]);
  const [dairyBuyers, setDairyBuyers] = useState([]);
  const [priceSensitivity, setPriceSensitivity] = useState([]);
  const [householdBasket, setHouseholdBasket] = useState([]);
  const [clv, setClv] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [
        tiers, stores, products, basket, spenders,
        catSpend, storeCat, churn, dairy, priceSens,
        household, lifetime
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/analytics/loyalty-tier-count"),
        axios.get("http://localhost:5000/api/analytics/sales-by-store"),
        axios.get("http://localhost:5000/api/analytics/top-products"),
        axios.get("http://localhost:5000/api/analytics/avg-basket-by-tier"),
        axios.get("http://localhost:5000/api/analytics/top-spenders"),
        axios.get("http://localhost:5000/api/analytics/category-spend"),
        axios.get("http://localhost:5000/api/analytics/store-category-demand"),
        axios.get("http://localhost:5000/api/analytics/churn-risk"),
        axios.get("http://localhost:5000/api/analytics/dairy-buyers"),
        axios.get("http://localhost:5000/api/analytics/price-sensitivity"),
        axios.get("http://localhost:5000/api/analytics/household-vs-basket"),
        axios.get("http://localhost:5000/api/analytics/clv"),
      ]);

      setTierCount(tiers.data);
      setSalesByStore(stores.data);
      setTopProducts(products.data);
      setAvgBasket(basket.data);
      setTopSpenders(spenders.data);
      setCategorySpend(catSpend.data);
      setStoreCategory(storeCat.data);
      setChurnRisk(churn.data);
      setDairyBuyers(dairy.data);
      setPriceSensitivity(priceSens.data);
      setHouseholdBasket(household.data);
      setClv(lifetime.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };

  const colors = ["#D32F2F", "#FF5252", "#C62828", "#FF7043", "#E53935"];

  return (
    <div className="analytics-page">
      <h1>Cargills Retail Analytics Dashboard</h1>

      {/* 1. Loyalty Tier Distribution */}
      <h2>Loyalty Tier Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={tierCount} dataKey="count" nameKey="_id" outerRadius={120} label>
            {tierCount.map((entry, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* 2. Total Sales by Store */}
      <h2>Total Sales by Store</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesByStore}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSales" fill="#D32F2F" />
        </BarChart>
      </ResponsiveContainer>

      {/* 3. Top 5 Best-Selling Products */}
      <h2>Top 5 Best-Selling Products</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalQty" fill="#FF7043" />
        </BarChart>
      </ResponsiveContainer>

      {/* 4. Avg Basket Size by Tier */}
      <h2>Average Basket Size by Loyalty Tier</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Loyalty Tier</th><th>Avg Items</th></tr>
        </thead>
        <tbody>
          {avgBasket.map((b, i) => (
            <tr key={i}><td>{b._id}</td><td>{b.avgItems.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 5. Top Spending Customers */}
      <h2>Top Spending Customers</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Customer</th><th>Total Spend</th></tr>
        </thead>
        <tbody>
          {topSpenders.map((s, i) => (
            <tr key={i}><td>{s._id}</td><td>{s.totalSpend}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 6. Category Spend per Customer */}
      <h2>Category Spend per Customer</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Customer</th><th>Category</th><th>Spend</th></tr>
        </thead>
        <tbody>
          {categorySpend.slice(0, 20).map((c, i) => (
            <tr key={i}><td>{c._id.customer}</td><td>{c._id.category}</td><td>{c.spend}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 7. Store-Level Category Demand */}
      <h2>Store-Level Category Demand</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Store</th><th>Category</th><th>Total Qty</th></tr>
        </thead>
        <tbody>
          {storeCategory.slice(0, 20).map((sc, i) => (
            <tr key={i}><td>{sc._id.store}</td><td>{sc._id.category}</td><td>{sc.totalQty}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 8. Churn Risk Customers */}
      <h2>Churn Risk Customers (No Purchase in 60 Days)</h2>
      <ul>
        {churnRisk.map((c, i) => <li key={i}>{c._id} — Last Purchase: {new Date(c.lastPurchase).toDateString()}</li>)}
      </ul>

      {/* 9. Dairy Buyers (Simple Cross-Sell Proxy) */}
      <h2>Customers Who Bought Dairy Products</h2>
      <ul>
        {dairyBuyers.map((d, i) => (
          <li key={i}>{d.customer_id} — Transaction {d.transaction_id}</li>
        ))}
      </ul>

      {/* 10. Price Sensitivity by Tier */}
      <h2>Price Sensitivity by Loyalty Tier</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Loyalty Tier</th><th>Avg Price per Item</th></tr>
        </thead>
        <tbody>
          {priceSensitivity.map((p, i) => (
            <tr key={i}><td>{p._id}</td><td>{p.avgPrice.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>

      {/* 11. Household Size vs Basket Value */}
      <h2>Household Size vs Basket Value</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={householdBasket}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgSpend" fill="#C62828" />
        </BarChart>
      </ResponsiveContainer>

      {/* 12. Customer Lifetime Value */}
      <h2>Customer Lifetime Value (Top 10)</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Customer</th><th>Lifetime Spend</th><th>Transactions</th></tr>
        </thead>
        <tbody>
          {clv.slice(0, 10).map((c, i) => (
            <tr key={i}>
              <td>{c._id}</td>
              <td>{c.lifetimeSpend}</td>
              <td>{c.txCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsPage;
