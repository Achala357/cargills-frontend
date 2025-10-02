import CustomerDashboard from "../components/CustomerDashboard";

function Customers() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Customers</h1>
        <p className="page-subtitle">Manage loyalty members, household profiles, and preferences.</p>
      </header>
      <CustomerDashboard />
    </div>
  );
}

export default Customers;
