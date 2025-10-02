import OfferDashboard from "../components/OfferDashboard";

function Offers() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
        <p className="text-sm text-gray-500">
          Configure targeted promotions, eligibility tiers, and category scopes for customer engagement.
        </p>
      </header>
      <OfferDashboard />
    </div>
  );
}

export default Offers;
