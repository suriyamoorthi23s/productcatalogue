
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUrlState } from "../hooks/UseUrlState";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/UseCategories";
import { useScrollRestoration } from "../hooks/UseScrollRestoration";
import { catalogUrlSchema } from "../UrlSchema";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ActiveFilterChips from "../components/ActiveFilterChips";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const PAGE_SIZE = 12;

export default function CatalogPage() {
  const [urlState, setUrlState] = useUrlState(catalogUrlSchema);
  const { q, category, minPrice, maxPrice, inStock, sortBy, order, page } = urlState;
  const location = useLocation();

  // Locally-editable copies of the free-text inputs. These update on
  // every keystroke for a responsive field; only the debounced value
  // gets pushed to the URL (and, for search, triggers a network call).
  const [searchInput, setSearchInput] = useState(q);
  const [minPriceInput, setMinPriceInput] = useState(minPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(maxPrice);

  // Re-sync local inputs when the URL changes from outside typing:
  // back/forward navigation, removing a chip, "clear all".
  useEffect(() => setSearchInput(q), [q]);
  useEffect(() => setMinPriceInput(minPrice), [minPrice]);
  useEffect(() => setMaxPriceInput(maxPrice), [maxPrice]);

  const debouncedSearch = useDebouncedValue(searchInput, 400);
  const debouncedMinPrice = useDebouncedValue(minPriceInput, 400);
  const debouncedMaxPrice = useDebouncedValue(maxPriceInput, 400);

  useEffect(() => {
    if (debouncedSearch !== q) setUrlState({ q: debouncedSearch, page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedMinPrice !== minPrice || debouncedMaxPrice !== maxPrice) {
      setUrlState({ minPrice: debouncedMinPrice, maxPrice: debouncedMaxPrice, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedMinPrice, debouncedMaxPrice]);

  const categories = useCategories();

  // Only search text and category can be filtered server-side by the
  // API, so those are the only two things that re-trigger a fetch.
  // Price range, in-stock and sort are applied to the fetched set
  // client-side in the memo below.
  const { products, status, retry } = useProducts({
    search: debouncedSearch,
    category,
  });

  const filteredSorted = useMemo(() => {
    let list = products;

    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    if (min !== null && !Number.isNaN(min)) list = list.filter((p) => p.price >= min);
    if (max !== null && !Number.isNaN(max)) list = list.filter((p) => p.price <= max);
    if (inStock) list = list.filter((p) => p.stock > 0);

    if (sortBy === "price" || sortBy === "rating") {
      list = [...list].sort((a, b) =>
        order === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]
      );
    }

    return list;
  }, [products, minPrice, maxPrice, inStock, sortBy, order]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => filteredSorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filteredSorted, safePage]
  );

  // Restoring scroll only once the real content (not skeletons) is on
  // screen keeps us from scrolling to a position that doesn't exist yet.
  const scrollKey = location.pathname + location.search;
  useScrollRestoration(scrollKey, status === "success");

  const sortValue = sortBy ? `${sortBy}-${order}` : "";

  const chips = [];
  if (q) {
    chips.push({ key: "q", label: `Search: "${q}"`, onRemove: () => setUrlState({ q: "" }) });
  }
  if (category !== "all") {
    const label = categories.find((c) => c.slug === category)?.name ?? category;
    chips.push({
      key: "category",
      label: `Category: ${label}`,
      onRemove: () => setUrlState({ category: "all" }),
    });
  }
  if (minPrice !== "") {
    chips.push({ key: "minPrice", label: `Min $${minPrice}`, onRemove: () => setUrlState({ minPrice: "" }) });
  }
  if (maxPrice !== "") {
    chips.push({ key: "maxPrice", label: `Max $${maxPrice}`, onRemove: () => setUrlState({ maxPrice: "" }) });
  }
  if (inStock) {
    chips.push({ key: "inStock", label: "In stock only", onRemove: () => setUrlState({ inStock: false }) });
  }

  const clearAll = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setUrlState({
      q: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      sortBy: "",
      order: "asc",
      page: 1,
    });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-2xl">Catalogue</h1>
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {status === "success" ? `${filteredSorted.length} products` : "\u00A0"}
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <FilterBar
          categories={categories}
          category={category}
          onCategoryChange={(value) => setUrlState({ category: value, page: 1 })}
          minPrice={minPriceInput}
          maxPrice={maxPriceInput}
          onMinPriceChange={setMinPriceInput}
          onMaxPriceChange={setMaxPriceInput}
          inStock={inStock}
          onInStockChange={(value) => setUrlState({ inStock: value, page: 1 })}
          sortValue={sortValue}
          onSortChange={(value) => {
            if (!value) return setUrlState({ sortBy: "", order: "asc" });
            const [field, dir] = value.split("-");
            setUrlState({ sortBy: field, order: dir });
          }}
        />
        <ActiveFilterChips chips={chips} onClearAll={clearAll} />
      </div>

      {status === "error" ? (
        <ErrorState onRetry={retry} />
      ) : status === "success" && filteredSorted.length === 0 ? (
        <EmptyState search={q} />
      ) : (
        <>
          <ProductGrid
            products={pageItems}
            loading={status === "loading"}
            buildDetailPath={(id) => `/product/${id}`}
          />
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={(p) => setUrlState({ page: p })}
          />
        </>
      )}
    </div>
  );
}