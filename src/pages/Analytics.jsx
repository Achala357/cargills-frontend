import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const pieColors = ["#2563eb", "#60a5fa", "#93c5fd", "#38bdf8"];

function Analytics() {
  const [topSpenders, setTopSpenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/top-spenders")
      .then((res) => {
        setTopSpenders(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top spenders", err);
        setError("We couldn't load the latest spending insights. Please try again shortly.");
        setLoading(false);
      });
  }, []);

  const topSpenderChartData = useMemo(() => {
    if (!topSpenders || topSpenders.length === 0) {
      return [
        { name: "Customer A", total: 0 },
        { name: "Customer B", total: 0 },
        { name: "Customer C", total: 0 },
      ];
    }

    return topSpenders.map((spender, index) => ({
      name:
        spender.name ||
        spender.customer_name ||
        spender.customer_id ||
        spender._id ||
        `Customer ${index + 1}`,
      total: Number(spender.totalSpent || spender.total || 0),
    }));
  }, [topSpenders]);

  const categoryPerformanceData = useMemo(
    () => [
      { name: "Fresh Food", value: 35 },
      { name: "Pantry", value: 28 },
      { name: "Household", value: 22 },
      { name: "Wellness", value: 15 },
    ],
    [],
  );

  const loyaltyTrendData = useMemo(
    () => [
      { month: "Jan", redemptions: 120 },
      { month: "Feb", redemptions: 160 },
      { month: "Mar", redemptions: 190 },
      { month: "Apr", redemptions: 170 },
      { month: "May", redemptions: 210 },
      { month: "Jun", redemptions: 240 },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <p className="text-sm text-gray-500">
          Monitor key personalization metrics and prepare visual insights for the Decision Analytics presentation.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Top Spenders</h2>
              <p className="mt-1 text-sm text-gray-500">Live summary of the highest spending customers.</p>
            </div>
            {loading && <span className="text-xs font-medium text-blue-600">Loading…</span>}
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSpenderChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip cursor={{ fill: "#eff6ff" }} />
                <Bar dataKey="total" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border-t border-gray-200 pt-4">
            {error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : topSpenders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {topSpenders.map((spender, index) => (
                  <li key={spender._id || index} className="flex items-center justify-between py-2 text-sm">
                    <span className="font-medium text-gray-700">
                      {spender.name || spender.customer_name || spender.customer_id || spender._id || `Customer ${index + 1}`}
                    </span>
                    <span className="text-gray-500">Rs.{Number(spender.totalSpent || 0).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Data will populate once transactions are recorded.</p>
            )}
          </div>
        </section>

        <section className="card space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Offer Performance</h2>
            <p className="mt-1 text-sm text-gray-500">Placeholder for upcoming offer conversion analysis.</p>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-400">
            Chart placeholder
          </div>
        </section>

        <section className="card space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Category Contribution</h2>
            <p className="mt-1 text-sm text-gray-500">Illustrative mix of basket value by category.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryPerformanceData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                  {categoryPerformanceData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="card space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Loyalty Redemptions</h2>
            <p className="mt-1 text-sm text-gray-500">Trend placeholder for future loyalty programme insights.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loyaltyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="redemptions" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Analytics;
