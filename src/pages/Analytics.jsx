import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [topSpenders, setTopSpenders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics/top-spenders")
      .then(res => setTopSpenders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="page-subtitle">Review shopper trends and reward your top spenders.</p>
      </header>

      <section className="dashboard-section">
        <h2 className="section-title">Top Spenders</h2>
        <div className="card">
          {topSpenders.length === 0 ? (
            <p className="empty-state">No spending insights available yet.</p>
          ) : (
            <ul className="data-list">
              {topSpenders.map((s, i) => (
                <li key={i} className="data-card">
                  <div>
                    <span className="item-title">Customer {s._id}</span>
                    <p className="item-meta">Total Spent: Rs.{s.totalSpent}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default Analytics;
