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

  const primaryRed = "#D32F2F";
  const colors = [primaryRed];

  return (
    <div className="analytics-page min-h-screen bg-[#F9FAFB] px-4 py-8 md:px-10 md:py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center text-[#D32F2F] tracking-tight">Cargills Retail Analytics Dashboard</h1>

      {/* 1. Loyalty Tier Distribution */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Loyalty Tier Distribution</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={tierCount} dataKey="count" nameKey="_id" outerRadius={120} label>
                {tierCount.map((entry, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "0.75rem", borderColor: primaryRed }} />
              <Legend wrapperStyle={{ color: "#374151" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 2. Total Sales by Store */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Total Sales by Store</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByStore}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="_id" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", borderColor: primaryRed }} />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Bar dataKey="totalSales" fill={primaryRed} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. Top 5 Best-Selling Products */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Top 5 Best-Selling Products</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="_id" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", borderColor: primaryRed }} />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Bar dataKey="totalQty" fill={primaryRed} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. Avg Basket Size by Tier */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Average Basket Size by Loyalty Tier</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Loyalty Tier</th>
                <th className="px-4 py-3 text-left font-semibold">Avg Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {avgBasket.map((b, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{b._id}</td>
                  <td className="px-4 py-3">{b.avgItems.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Top Spending Customers */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Top Spending Customers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Total Spend</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {topSpenders.map((s, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{s._id}</td>
                  <td className="px-4 py-3">{s.totalSpend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Category Spend per Customer */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Category Spend per Customer</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Spend</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {categorySpend.slice(0, 20).map((c, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{c._id.customer}</td>
                  <td className="px-4 py-3">{c._id.category}</td>
                  <td className="px-4 py-3">{c.spend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Store-Level Category Demand */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Store-Level Category Demand</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Store</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Total Qty</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {storeCategory.slice(0, 20).map((sc, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{sc._id.store}</td>
                  <td className="px-4 py-3">{sc._id.category}</td>
                  <td className="px-4 py-3">{sc.totalQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. Churn Risk Customers */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Churn Risk Customers (No Purchase in 60 Days)</h2>
        <ul className="space-y-3 text-gray-700">
          {churnRisk.map((c, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 rounded-xl bg-[#FDECEC] px-4 py-3 border-l-4 border-[#D32F2F] shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-gray-900">{c._id}</span>
              <span className="text-sm text-gray-600">Last Purchase: {new Date(c.lastPurchase).toDateString()}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. Dairy Buyers (Simple Cross-Sell Proxy) */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Customers Who Bought Dairy Products</h2>
        <ul className="space-y-3 text-gray-700">
          {dairyBuyers.map((d, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 rounded-xl bg-[#FDECEC] px-4 py-3 border-l-4 border-[#D32F2F] shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-gray-900">{d.customer_id}</span>
              <span className="text-sm text-gray-600">Transaction {d.transaction_id}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. Price Sensitivity by Tier */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Price Sensitivity by Loyalty Tier</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Loyalty Tier</th>
                <th className="px-4 py-3 text-left font-semibold">Avg Price per Item</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {priceSensitivity.map((p, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{p._id}</td>
                  <td className="px-4 py-3">{p.avgPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 11. Household Size vs Basket Value */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Household Size vs Basket Value</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={householdBasket}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="_id" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip contentStyle={{ borderRadius: "0.75rem", borderColor: primaryRed }} />
              <Legend wrapperStyle={{ color: "#374151" }} />
              <Bar dataKey="avgSpend" fill={primaryRed} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 12. Customer Lifetime Value */}
      <section className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 border-b-4 border-[#D32F2F] inline-block pb-1">Customer Lifetime Value (Top 10)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[#D32F2F] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Customer</th>
                <th className="px-4 py-3 text-left font-semibold">Lifetime Spend</th>
                <th className="px-4 py-3 text-left font-semibold">Transactions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {clv.slice(0, 10).map((c, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-[#FDECEC] hover:bg-[#F8C5C5] transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{c._id}</td>
                  <td className="px-4 py-3">{c.lifetimeSpend}</td>
                  <td className="px-4 py-3">{c.txCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AnalyticsPage;
