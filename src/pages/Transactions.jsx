import TransactionDashboard from "../components/TransactionDashboard";

function Transactions() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-500">
          Track customer purchases and ensure transaction-level data remains accurate for analytics.
        </p>
      </header>
      <TransactionDashboard />
    </div>
  );
}

export default Transactions;
