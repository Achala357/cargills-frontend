import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Offers from "./pages/Offers";
import Stores from "./pages/Stores";

const navigationItems = [
  { name: "Analytics", to: "/analytics" },
  { name: "Customers", to: "/customers" },
  { name: "Products", to: "/products" },
  { name: "Transactions", to: "/transactions" },
  { name: "Offers", to: "/offers" },
  { name: "Stores", to: "/stores" },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        <aside className="hidden md:flex md:w-60 lg:w-64 flex-col border-r border-gray-200 bg-[#f8f9fa]">
          <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-lg font-semibold text-blue-700">Cargills Personalization</h1>
            <p className="mt-1 text-sm text-gray-500">Decision Analytics Portal</p>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex-1">
          <header className="md:hidden bg-[#f8f9fa] border-b border-gray-200">
            <div className="px-4 py-4">
              <h1 className="text-lg font-semibold text-blue-700">Cargills Personalization</h1>
              <p className="mt-1 text-sm text-gray-500">Navigation</p>
            </div>
            <nav className="px-4 pb-4 space-y-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </header>
          <main className="px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto max-w-6xl space-y-6">
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
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
