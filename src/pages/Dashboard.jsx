import CustomerDashboard from "../components/CustomerDashboard";
import ProductDashboard from "../components/ProductDashboard";
import TransactionDashboard from "../components/TransactionDashboard";
import OfferDashboard from "../components/OfferDashboard";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <CustomerDashboard />
      <hr />
      <ProductDashboard />
      <hr />
      <TransactionDashboard />
      <hr />
      <OfferDashboard />
    </div>
  );
}

export default Dashboard;
