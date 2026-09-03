export default function SkeletonCard() {
  return (
    <div
      className="flex animate-pulse flex-col overflow-hidden rounded-card border border-line bg-surface"
      aria-hidden="true"
    >
      <div className="aspect-[4/3] bg-line/50" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-3 w-16 rounded bg-line/50" />
        <div className="h-4 w-4/5 rounded bg-line/50" />
        <div className="h-4 w-2/5 rounded bg-line/50" />
      </div>
    </div>
  );
}

