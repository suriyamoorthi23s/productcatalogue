import { useState } from "react";

export default function ImageGallery({ images, title }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square w-full overflow-hidden rounded-card border border-line bg-surface">
        <img
          src={images[active]}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product images"
          className="flex gap-2 overflow-x-auto"
        >
          {images.map((src, i) => (
            <button
              key={src + i}
              role="tab"
              aria-selected={i === active}
              type="button"
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-card border ${
                i === active ? "border-pine" : "border-line"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
