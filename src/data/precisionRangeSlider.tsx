import { PrecisionRangeSliderPreview } from "../components/previews/PrecisionRangeSliderPreview";
import type { UIComponent } from "../types/component";

export const precisionRangeSlider: UIComponent[] = [
  {
    id: "precision-dual-range-slider",
    name: "Precision Dual Range Slider",
    description:
      "Advanced dual-handle range slider with pointer dragging, keyboard controls, value tooltips and minimum-range constraints.",
    category: "Sliders",

    preview: <PrecisionRangeSliderPreview />,

    typescript: `import {
  type KeyboardEvent,
  type PointerEvent,
  useRef,
  useState,
} from "react";

const MIN = 0;
const MAX = 1000;
const STEP = 10;
const MIN_GAP = 100;

type Thumb = "min" | "max";

function RangeSlider() {
  const sliderRef =
    useRef<HTMLDivElement>(null);

  const [range, setRange] =
    useState({
      min: 180,
      max: 760,
    });

  const [activeThumb, setActiveThumb] =
    useState<Thumb | null>(null);

  const valueToPercent = (
    value: number,
  ) =>
    ((value - MIN) /
      (MAX - MIN)) *
    100;

  const updateThumb = (
    thumb: Thumb,
    value: number,
  ) => {
    setRange((current) => {
      if (thumb === "min") {
        return {
          ...current,
          min: Math.min(
            value,
            current.max -
              MIN_GAP,
          ),
        };
      }

      return {
        ...current,
        max: Math.max(
          value,
          current.min +
            MIN_GAP,
        ),
      };
    });
  };

  const minPercent =
    valueToPercent(
      range.min,
    );

  const maxPercent =
    valueToPercent(
      range.max,
    );

  return (
    <div ref={sliderRef}>
      <div className="relative h-2 rounded-full bg-blue-100">
        <div
          className="absolute h-full rounded-full bg-blue-300"
          style={{
            left: \`\${minPercent}%\`,
            width: \`\${
              maxPercent -
              minPercent
            }%\`,
          }}
        />
      </div>

      <button
        role="slider"
        aria-valuemin={MIN}
        aria-valuemax={
          range.max -
          MIN_GAP
        }
        aria-valuenow={
          range.min
        }
      />

      <button
        role="slider"
        aria-valuemin={
          range.min +
          MIN_GAP
        }
        aria-valuemax={MAX}
        aria-valuenow={
          range.max
        }
      />
    </div>
  );
}

export default RangeSlider;`,

    tailwind: `Container:
w-full
max-w-xl
rounded-3xl
border
border-blue-100
bg-white
p-6
shadow-sm

Track:
h-2
rounded-full
bg-blue-100

Selected range:
bg-gradient-to-r
from-blue-300
to-blue-400
shadow-[0_0_10px_rgba(147,197,253,0.6)]

Handles:
h-6
w-6
rounded-full
border-[3px]
border-white
bg-blue-300
shadow-[0_2px_10px_rgba(59,130,246,0.35)]
focus:ring-4
focus:ring-blue-100
hover:scale-110

Tooltip:
rounded-lg
bg-zinc-950
px-2.5
py-1.5
text-[11px]
font-medium
text-white

Selected value card:
border-blue-100
bg-blue-50
text-blue-700`,

    javascript: `const MIN = 0;
const MAX = 1000;
const STEP = 10;
const MIN_GAP = 100;

function clamp(
  value,
  min,
  max,
) {
  return Math.min(
    max,
    Math.max(
      min,
      value,
    ),
  );
}

function snapToStep(
  value,
) {
  return (
    Math.round(
      value / STEP,
    ) * STEP
  );
}

function clientXToValue(
  clientX,
  slider,
) {
  const rect =
    slider.getBoundingClientRect();

  const percentage =
    clamp(
      (clientX -
        rect.left) /
        rect.width,
      0,
      1,
    );

  return snapToStep(
    MIN +
      percentage *
        (MAX - MIN),
  );
}

function updateMinimum(
  value,
  maximum,
) {
  return clamp(
    value,
    MIN,
    maximum - MIN_GAP,
  );
}

function updateMaximum(
  value,
  minimum,
) {
  return clamp(
    value,
    minimum + MIN_GAP,
    MAX,
  );
}

function valueToPercent(
  value,
) {
  return (
    ((value - MIN) /
      (MAX - MIN)) *
    100
  );
}`,
  },
];
