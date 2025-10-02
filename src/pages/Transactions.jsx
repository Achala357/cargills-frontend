import TransactionDashboard from "../components/TransactionDashboard";

function Transactions() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Transactions</h1>
        <p className="page-subtitle">Audit purchases and keep shopper history up to date.</p>
      </header>
      <TransactionDashboard />
    </div>
  );
}

export default Transactions;
