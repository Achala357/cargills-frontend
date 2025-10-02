import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Offers from "./pages/Offers";
import Stores from "./pages/Stores";
import "./styles.css";

function App() {
  const navLinks = [
    { to: "/analytics", label: "Analytics" },
    { to: "/customers", label: "Customers" },
    { to: "/products", label: "Products" },
    { to: "/transactions", label: "Transactions" },
    { to: "/offers", label: "Offers" },
    { to: "/stores", label: "Stores" },
  ];

  return (
    <Router>
      <div className="app-container">
        <aside className="sidebar">
          <img src="/cargills-logo.png" alt="Cargills Logo" className="h-12 mx-auto my-4" />
          <h1 className="sidebar-title">Cargills Insights</h1>
          <nav className="sidebar-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  ["nav-link", isActive ? "active" : null].filter(Boolean).join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/stores" element={<Stores />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
