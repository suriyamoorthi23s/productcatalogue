
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../api/products";
import ImageGallery from "../components/ImageGallery";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    fetchProductById(id, controller.signal)
      .then((data) => {
        setProduct(data);
        setStatus("success");
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, [id]);

  // Escape returns to the catalogue - this goes through browser
  // history (-1), which is what makes the list restore its exact
  // filters/page/scroll: it's the same history entry, not a fresh nav.
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-muted hover:text-ink"
      >
        ← Back to catalogue
      </button>

      {status === "loading" && <DetailSkeleton />}

      {status === "error" && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <h2 className="font-display text-lg text-rust">
            Couldn't load this product
          </h2>
          <Link to="/" className="text-sm underline">
            Back to catalogue
          </Link>
        </div>
      )}

      {status === "success" && product && (
        <div className="grid gap-8 sm:grid-cols-2">
          <ImageGallery
            images={product.images?.length ? product.images : [product.thumbnail]}
            title={product.title}
          />
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-muted">
              {product.category}
            </span>
            <h1 className="font-display text-2xl">{product.title}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-medium">
                {priceFormatter.format(product.price)}
              </span>
              <span className="text-sm text-muted">★ {product.rating} rating</span>
            </div>
            <span
              className={`w-fit rounded-full px-2 py-0.5 text-xs ${
                product.stock > 0 ? "bg-pine/10 text-pine" : "bg-rust/10 text-rust"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
            <p className="text-sm leading-relaxed text-ink/80">
              {product.description}
            </p>
            {product.brand && (
              <p className="text-sm text-muted">Brand: {product.brand}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 sm:grid-cols-2" aria-busy="true">
      <div className="aspect-square rounded-card bg-line/50" />
      <div className="flex flex-col gap-3">
        <div className="h-3 w-20 rounded bg-line/50" />
        <div className="h-6 w-3/4 rounded bg-line/50" />
        <div className="h-4 w-1/3 rounded bg-line/50" />
        <div className="h-24 w-full rounded bg-line/50" />
      </div>
    </div>
  );
}