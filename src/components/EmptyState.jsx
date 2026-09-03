export default function EmptyState({ search }) {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <h2 className="font-display text-lg">
        {search ? `No results for "${search}"` : "No products match your filters"}
      </h2>
      <p className="max-w-sm text-sm text-muted">
        Try widening the price range, clearing a filter, or checking the
        spelling of your search.
      </p>
    </div>
  );
}