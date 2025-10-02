import ProductDashboard from "../components/ProductDashboard";

function Products() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <p className="text-sm text-gray-500">
          Maintain the product catalogue including pricing, categories, and tag metadata.
        </p>
      </header>
      <ProductDashboard />
    </div>
  );
}

export default Products;
