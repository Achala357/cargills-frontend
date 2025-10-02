import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Offers from "./pages/Offers";
import Stores from "./pages/Stores";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/analytics">Analytics</Link> |{" "}
          <Link to="/customers">Customers</Link> |{" "}
          <Link to="/products">Products</Link> |{" "}
          <Link to="/transactions">Transactions</Link> |{" "}
          <Link to="/offers">Offers</Link> |{" "}
          <Link to="/stores">Stores</Link>
        </nav>
        <hr />

        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/stores" element={<Stores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
