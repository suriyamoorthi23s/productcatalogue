export default function SearchBar({ value, onChange }) {
  return (
    <div>
      <label htmlFor="catalog-search" className="sr-only">
        Search products
      </label>
      <input
        id="catalog-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by name…"
        className="w-full rounded-card border border-line bg-surface px-4 py-2.5 text-sm placeholder:text-muted focus-visible:border-pine"
      />
    </div>
  );
}
