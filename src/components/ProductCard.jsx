
import { memo } from "react";
import { Link } from "react-router-dom";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ProductCard({ product, to }) {
  return (
    <Link
      to={to}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-pine"
    >
      <div className="aspect-[4/3] overflow-hidden bg-paper">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-1 p-3">
        <span className="text-xs uppercase tracking-wide text-muted">
          {product.category}
        </span>
        <h3 className="line-clamp-2 font-display text-base leading-snug">
          {product.title}
        </h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-medium">{priceFormatter.format(product.price)}</span>
          <span className="text-sm text-muted">★ {product.rating?.toFixed(1)}</span>
        </div>
        {product.stock <= 0 && (
          <span className="mt-1 inline-block w-fit rounded-full bg-rust/10 px-2 py-0.5 text-xs text-rust">
            Out of stock
          </span>
        )}
      </div>
    </Link>
  );
}

export default memo(ProductCard);
