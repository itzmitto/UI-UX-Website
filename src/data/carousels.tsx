import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import type { UIComponent } from "../types/component";

export const carousels: UIComponent[] = [
  {
    id: "image-carousel",
    name: "Image Carousel",
    description: "Clean image carousel layout with navigation controls.",
    category: "Carousels",

    preview: (
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-zinc-100">
        <div className="flex h-64 items-center justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white text-3xl font-bold text-zinc-300 shadow">
            UI
          </div>
        </div>

        <button className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow">
          <ChevronLeft size={17} />
        </button>

        <button className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow">
          <ChevronRight size={17} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          <span className="h-2 w-5 rounded-full bg-zinc-950" />
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
          <span className="h-2 w-2 rounded-full bg-zinc-400" />
        </div>
      </div>
    ),

    typescript: `import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function ImageCarousel() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
      <div className="h-64" />

      <button className="absolute left-4 top-1/2 -translate-y-1/2">
        <ChevronLeft />
      </button>

      <button className="absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronRight />
      </button>
    </div>
  );
}

export default ImageCarousel;`,

    tailwind: `relative
overflow-hidden
rounded-2xl
bg-zinc-100`,
  },

  {
    id: "card-carousel",
    name: "Card Carousel",
    description: "Horizontal carousel layout for cards and products.",
    category: "Carousels",

    preview: (
      <div className="w-full max-w-2xl overflow-hidden">
        <div className="flex gap-3">
          {["Design", "Develop", "Deploy"].map((item) => (
            <div
              key={item}
              className="min-w-44 rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className="h-20 rounded-lg bg-zinc-100" />

              <p className="mt-4 text-sm font-semibold text-zinc-950">
                {item}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                Explore components
              </p>
            </div>
          ))}
        </div>
      </div>
    ),

    typescript: `function CardCarousel() {
  const items = [
    "Design",
    "Develop",
    "Deploy",
  ];

  return (
    <div className="overflow-hidden">
      <div className="flex gap-3">
        {items.map((item) => (
          <div
            key={item}
            className="min-w-44 rounded-xl border p-5"
          >
            <div className="h-20 rounded-lg bg-zinc-100" />

            <p className="mt-4 font-semibold">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardCarousel;`,

    tailwind: `overflow-hidden

flex
gap-3

min-w-44
rounded-xl
border
p-5`,
  },

  {
    id: "testimonial-carousel",
    name: "Testimonial Carousel",
    description: "Carousel-style testimonial card with pagination.",
    category: "Carousels",

    preview: (
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <Quote
          size={28}
          className="text-zinc-300"
        />

        <p className="mt-4 text-base leading-7 text-zinc-700">
          “These components made building our interface much faster.”
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-950">
              Alex Morgan
            </p>

            <p className="text-xs text-zinc-400">
              Product Designer
            </p>
          </div>

          <div className="flex gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200">
              <ChevronLeft size={15} />
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-white">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    ),

    typescript: `import {
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";

function TestimonialCarousel() {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <Quote />

      <p className="mt-4">
        “These components made building our interface much faster.”
      </p>

      <div className="mt-6 flex justify-between">
        <div>
          <p className="font-semibold">
            Alex Morgan
          </p>

          <p className="text-xs text-zinc-400">
            Product Designer
          </p>
        </div>

        <div className="flex gap-2">
          <button>
            <ChevronLeft />
          </button>

          <button>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;`,

    tailwind: `rounded-2xl
border
bg-white
p-6
shadow-sm`,
  },
];