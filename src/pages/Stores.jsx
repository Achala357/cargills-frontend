import StoreDashboard from "../components/StoreDashboard";

function Stores() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Stores</h1>
        <p className="page-subtitle">Track locations, formats, and neighborhood performance.</p>
      </header>
      <StoreDashboard />
    </div>
  );
}

export default Stores;
