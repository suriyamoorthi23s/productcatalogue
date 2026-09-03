export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <h2 className="font-display text-lg text-rust">Couldn't load products</h2>
      <p className="max-w-sm text-sm text-muted">
        Something went wrong reaching the catalogue. Check your connection
        and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-card bg-pine px-4 py-2 text-sm font-medium text-white hover:bg-pineDark"
      >
        Retry
      </button>
    </div>
  );
}
