import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function ProductGrid({ products, loading, buildDetailPath }) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        aria-busy="true"
        aria-label="Loading products"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          to={buildDetailPath(product.id)}
        />
      ))}
    </div>
  );
}

