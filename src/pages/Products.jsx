import ProductDashboard from "../components/ProductDashboard";

function Products() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <h1 className="page-title">Products</h1>
        <p className="page-subtitle">Keep the Cargills catalogue fresh with accurate pricing and tagging.</p>
      </header>
      <ProductDashboard />
    </div>
  );
}

export default Products;
