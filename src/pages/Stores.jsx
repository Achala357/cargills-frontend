import StoreDashboard from "../components/StoreDashboard";

function Stores() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Stores</h1>
        <p className="text-sm text-gray-500">
          Keep the store network up to date with current locations and identifiers.
        </p>
      </header>
      <StoreDashboard />
    </div>
  );
}

export default Stores;
