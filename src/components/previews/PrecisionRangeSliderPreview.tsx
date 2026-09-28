import { type KeyboardEvent, type PointerEvent, useRef, useState } from "react";

const MIN = 0;
const MAX = 1000;
const STEP = 10;
const MIN_GAP = 100;

type Thumb = "min" | "max";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snapToStep(value: number) {
  return Math.round(value / STEP) * STEP;
}

function formatValue(value: number) {
  return `€${value}`;
}

export function PrecisionRangeSliderPreview() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [range, setRange] = useState({
    min: 180,
    max: 760,
  });

  const [activeThumb, setActiveThumb] = useState<Thumb | null>(null);

  const [dragging, setDragging] = useState(false);

  const valueToPercent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;

  const clientXToValue = (clientX: number) => {
    const slider = sliderRef.current;

    if (!slider) {
      return MIN;
    }

    const rect = slider.getBoundingClientRect();

    const percentage = clamp((clientX - rect.left) / rect.width, 0, 1);

    return snapToStep(MIN + percentage * (MAX - MIN));
  };

  const updateThumb = (thumb: Thumb, rawValue: number) => {
    setRange((current) => {
      if (thumb === "min") {
        return {
          ...current,
          min: clamp(rawValue, MIN, current.max - MIN_GAP),
        };
      }

      return {
        ...current,
        max: clamp(rawValue, current.min + MIN_GAP, MAX),
      };
    });
  };

  const startDrag = (event: PointerEvent<HTMLButtonElement>, thumb: Thumb) => {
    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    setActiveThumb(thumb);
    setDragging(true);

    updateThumb(thumb, clientXToValue(event.clientX));
  };

  const moveDrag = (event: PointerEvent<HTMLButtonElement>, thumb: Thumb) => {
    if (!dragging || activeThumb !== thumb) {
      return;
    }

    updateThumb(thumb, clientXToValue(event.clientX));
  };

  const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragging(false);
    setActiveThumb(null);
  };

  const handleTrackPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const value = clientXToValue(event.clientX);

    const distanceToMin = Math.abs(value - range.min);

    const distanceToMax = Math.abs(value - range.max);

    const thumb: Thumb = distanceToMin <= distanceToMax ? "min" : "max";

    updateThumb(thumb, value);

    setActiveThumb(thumb);

    window.setTimeout(() => {
      setActiveThumb(null);
    }, 280);
  };

  const handleKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
    thumb: Thumb,
  ) => {
    let nextValue = thumb === "min" ? range.min : range.max;

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      nextValue += STEP;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      nextValue -= STEP;
    } else if (event.key === "PageUp") {
      nextValue += STEP * 5;
    } else if (event.key === "PageDown") {
      nextValue -= STEP * 5;
    } else if (event.key === "Home") {
      nextValue = thumb === "min" ? MIN : range.min + MIN_GAP;
    } else if (event.key === "End") {
      nextValue = thumb === "max" ? MAX : range.max - MIN_GAP;
    } else {
      return;
    }

    event.preventDefault();

    setActiveThumb(thumb);

    updateThumb(thumb, snapToStep(nextValue));
  };

  const minPercent = valueToPercent(range.min);

  const maxPercent = valueToPercent(range.max);

  const selectedPercentage = ((range.max - range.min) / (MAX - MIN)) * 100;

  return (
    <div className="w-full max-w-xl rounded-3xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">
            Price range
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950">
            Select your range
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Drag either handle or use the keyboard.
          </p>
        </div>

        <div className="shrink-0 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-right">
          <p className="text-[10px] font-medium uppercase tracking-wide text-blue-500">
            Selected
          </p>

          <p className="mt-0.5 text-sm font-semibold text-blue-700">
            {formatValue(range.min)} – {formatValue(range.max)}
          </p>
        </div>
      </div>

      <div className="mt-10 px-2">
        <div ref={sliderRef} className="relative h-12 touch-none">
          <div
            onPointerDown={handleTrackPointerDown}
            className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 cursor-pointer rounded-full bg-blue-100"
          >
            <div
              className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-300 to-blue-400 shadow-[0_0_10px_rgba(147,197,253,0.6)]"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`,
              }}
            />

            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90"
                style={{
                  left: `${tick}%`,
                }}
              />
            ))}
          </div>

          <button
            type="button"
            role="slider"
            aria-label="Minimum price"
            aria-valuemin={MIN}
            aria-valuemax={range.max - MIN_GAP}
            aria-valuenow={range.min}
            aria-valuetext={formatValue(range.min)}
            onPointerDown={(event) => startDrag(event, "min")}
            onPointerMove={(event) => moveDrag(event, "min")}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(event) => handleKeyboard(event, "min")}
            onFocus={() => setActiveThumb("min")}
            onBlur={() => setActiveThumb(null)}
            className={`absolute top-1/2 z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-[3px] border-white bg-blue-300 shadow-[0_2px_10px_rgba(59,130,246,0.35)] outline-none transition focus:ring-4 focus:ring-blue-100 active:cursor-grabbing ${
              activeThumb === "min"
                ? "scale-125 bg-blue-400"
                : "hover:scale-110"
            }`}
            style={{
              left: `${minPercent}%`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />

            <span
              className={`pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-lg bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg transition-all duration-150 ${
                activeThumb === "min"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-1 scale-95 opacity-0"
              }`}
            >
              {formatValue(range.min)}
            </span>
          </button>

          <button
            type="button"
            role="slider"
            aria-label="Maximum price"
            aria-valuemin={range.min + MIN_GAP}
            aria-valuemax={MAX}
            aria-valuenow={range.max}
            aria-valuetext={formatValue(range.max)}
            onPointerDown={(event) => startDrag(event, "max")}
            onPointerMove={(event) => moveDrag(event, "max")}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(event) => handleKeyboard(event, "max")}
            onFocus={() => setActiveThumb("max")}
            onBlur={() => setActiveThumb(null)}
            className={`absolute top-1/2 z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border-[3px] border-white bg-blue-300 shadow-[0_2px_10px_rgba(59,130,246,0.35)] outline-none transition focus:ring-4 focus:ring-blue-100 active:cursor-grabbing ${
              activeThumb === "max"
                ? "scale-125 bg-blue-400"
                : "hover:scale-110"
            }`}
            style={{
              left: `${maxPercent}%`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />

            <span
              className={`pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-lg bg-zinc-950 px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg transition-all duration-150 ${
                activeThumb === "max"
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-1 scale-95 opacity-0"
              }`}
            >
              {formatValue(range.max)}
            </span>
          </button>
        </div>

        <div className="mt-1 flex justify-between text-[10px] font-medium text-zinc-400">
          <span>{formatValue(MIN)}</span>

          <span>€250</span>
          <span>€500</span>
          <span>€750</span>

          <span>{formatValue(MAX)}</span>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-[9px] font-medium uppercase tracking-wide text-zinc-400">
            Minimum
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-950">
            {formatValue(range.min)}
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-3">
          <p className="text-[9px] font-medium uppercase tracking-wide text-blue-500">
            Range
          </p>

          <p className="mt-1 text-sm font-semibold text-blue-700">
            {Math.round(selectedPercentage)}%
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3">
          <p className="text-[9px] font-medium uppercase tracking-wide text-zinc-400">
            Maximum
          </p>

          <p className="mt-1 text-sm font-semibold text-zinc-950">
            {formatValue(range.max)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrecisionRangeSliderPreview;
