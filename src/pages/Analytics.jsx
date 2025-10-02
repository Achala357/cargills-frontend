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
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-10">
        <header className="text-center space-y-3">
          <p className="inline-block rounded-full border border-red-200 bg-white px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-red-600 shadow-sm">
            Analytics
          </p>
          <h1 className="text-3xl font-bold text-red-700 sm:text-4xl">
            Cargills Retail Analytics Dashboard
          </h1>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Monitor loyalty trends, store performance, and customer engagement with a cohesive Cargills-inspired visual experience.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {/* 1. Loyalty Tier Distribution */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Loyalty Tier Distribution</h2>
              <p className="text-sm text-gray-500">Understand how members are segmented across loyalty tiers.</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={tierCount} dataKey="count" nameKey="_id" outerRadius={120} label>
                    {tierCount.map((entry, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", borderColor: "#fca5a5" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 2. Total Sales by Store */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Total Sales by Store</h2>
              <p className="text-sm text-gray-500">Track how each store is performing across the network.</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByStore}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                  <XAxis dataKey="_id" stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <YAxis stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", borderColor: "#fca5a5" }} />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#D32F2F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 3. Top 5 Best-Selling Products */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Top 5 Best-Selling Products</h2>
              <p className="text-sm text-gray-500">Identify products that consistently drive the highest sales.</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                  <XAxis dataKey="_id" stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <YAxis stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", borderColor: "#fca5a5" }} />
                  <Legend />
                  <Bar dataKey="totalQty" fill="#FF7043" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 4. Avg Basket Size by Tier */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Average Basket Size by Loyalty Tier</h2>
              <p className="text-sm text-gray-500">Compare how basket sizes differ between loyalty tiers.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Loyalty Tier</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Avg Items</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {avgBasket.map((b, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{b._id}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{b.avgItems.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. Top Spending Customers */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Top Spending Customers</h2>
              <p className="text-sm text-gray-500">Spotlight the customers driving the greatest value.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Customer</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Total Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {topSpenders.map((s, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{s._id}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{s.totalSpend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 6. Category Spend per Customer */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Category Spend per Customer</h2>
              <p className="text-sm text-gray-500">Explore category preferences for targeted promotions.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Customer</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Category</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Spend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {categorySpend.slice(0, 20).map((c, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{c._id.customer}</td>
                        <td className="px-4 py-3 text-gray-700">{c._id.category}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{c.spend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 7. Store-Level Category Demand */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Store-Level Category Demand</h2>
              <p className="text-sm text-gray-500">Analyze how category demand shifts between stores.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Store</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Category</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Total Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {storeCategory.slice(0, 20).map((sc, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{sc._id.store}</td>
                        <td className="px-4 py-3 text-gray-700">{sc._id.category}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{sc.totalQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 8. Churn Risk Customers */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Churn Risk Customers</h2>
              <p className="text-sm text-gray-500">Customers with no purchase activity in the past 60 days.</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              {churnRisk.map((c, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 shadow-sm shadow-red-100/50"
                >
                  <span className="font-semibold text-red-700">{c._id}</span>
                  <span className="text-gray-600">Last Purchase: {new Date(c.lastPurchase).toDateString()}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 9. Dairy Buyers (Simple Cross-Sell Proxy) */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Customers Who Bought Dairy Products</h2>
              <p className="text-sm text-gray-500">Useful for cross-selling and bundle opportunities.</p>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              {dairyBuyers.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50/40 px-4 py-3 shadow-sm shadow-red-100/50"
                >
                  <span className="font-semibold text-red-700">{d.customer_id}</span>
                  <span className="text-gray-600">Transaction {d.transaction_id}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 10. Price Sensitivity by Tier */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Price Sensitivity by Loyalty Tier</h2>
              <p className="text-sm text-gray-500">Gauge how average item prices shift by loyalty tier.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Loyalty Tier</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Avg Price per Item</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {priceSensitivity.map((p, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{p._id}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{p.avgPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 11. Household Size vs Basket Value */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Household Size vs Basket Value</h2>
              <p className="text-sm text-gray-500">Assess how household size correlates with basket spending.</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={householdBasket}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#fecaca" />
                  <XAxis dataKey="_id" stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <YAxis stroke="#b91c1c" tick={{ fill: "#7f1d1d" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", borderColor: "#fca5a5" }} />
                  <Legend />
                  <Bar dataKey="avgSpend" fill="#C62828" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 12. Customer Lifetime Value */}
          <section className="bg-white border border-red-100 rounded-2xl shadow-xl shadow-red-100/40 p-6 space-y-6 xl:col-span-2">
            <div>
              <h2 className="text-xl font-semibold text-red-700">Customer Lifetime Value (Top 10)</h2>
              <p className="text-sm text-gray-500">Highlighting long-term customer contributions.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-red-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-red-200 text-left text-sm">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide">Customer</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Lifetime Spend</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wide text-right">Transactions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-100">
                    {clv.slice(0, 10).map((c, i) => (
                      <tr key={i} className="odd:bg-white even:bg-red-50/60 hover:bg-red-100/60 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-700">{c._id}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{c.lifetimeSpend}</td>
                        <td className="px-4 py-3 text-right text-gray-700">{c.txCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
