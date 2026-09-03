export default function ActiveFilterChips({ chips, onClearAll }) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs hover:border-rust hover:text-rust"
        >
          {chip.label}
          <span aria-hidden="true">×</span>
          <span className="sr-only">Remove filter: {chip.label}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-medium text-muted underline underline-offset-2 hover:text-rust"
      >
        Clear all
      </button>
    </div>
  );
}
