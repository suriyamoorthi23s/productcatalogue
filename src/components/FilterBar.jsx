
export default function FilterBar({
  categories,
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  inStock,
  onInStockChange,
  sortValue,
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex flex-col gap-1">
        <label htmlFor="filter-category" className="text-xs font-medium text-muted">
          Category
        </label>
        <select
          id="filter-category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="min-w-[10rem] rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-muted">Price range</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            aria-label="Minimum price"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-20 rounded-card border border-line bg-surface px-2 py-2 text-sm"
          />
          <span className="text-muted" aria-hidden="true">
            –
          </span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            aria-label="Maximum price"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-20 rounded-card border border-line bg-surface px-2 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 pb-2 text-sm">
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onInStockChange(e.target.checked)}
          className="h-4 w-4 rounded border-line accent-pine"
        />
        In stock only
      </label>

      <div className="flex flex-col gap-1 sm:ml-auto">
        <label htmlFor="filter-sort" className="text-xs font-medium text-muted">
          Sort by
        </label>
        <select
          id="filter-sort"
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value)}
          className="min-w-[12rem] rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="rating-desc">Rating: High to low</option>
          <option value="rating-asc">Rating: Low to high</option>
        </select>
      </div>
    </div>
  );
}


