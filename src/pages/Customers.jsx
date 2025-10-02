import CustomerDashboard from "../components/CustomerDashboard";

function Customers() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500">
          Manage customer profiles, loyalty tiers, and household information for personalized campaigns.
        </p>
      </header>
      <CustomerDashboard />
    </div>
  );
}

export default Customers;
