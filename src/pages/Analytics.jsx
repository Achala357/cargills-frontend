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
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Top Spenders</h2>
      <ul>
        {topSpenders.map((s, i) => (
          <li key={i}>
            Customer {s._id} — Total Spent: Rs.{s.totalSpent}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Analytics;
