import OfferDashboard from "../components/OfferDashboard";

function Offers() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Offers</h1>
        <p className="page-subtitle">Plan timely promotions tailored for every loyalty tier.</p>
      </header>
      <OfferDashboard />
    </div>
  );
}

export default Offers;
