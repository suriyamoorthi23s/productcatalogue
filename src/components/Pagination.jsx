export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-3 pt-4">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-card border border-line px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Previous
      </button>
      <span className="text-sm text-muted">
        Page {page} of {totalPages}
      </span>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-card border border-line px-3 py-1.5 text-sm disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

