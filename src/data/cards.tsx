import { Check, Heart, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { type MouseEvent, useState } from "react";
import type { UIComponent } from "../types/component";

function InteractiveProductCardPreview() {
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const [glare, setGlare] = useState({
    x: 50,
    y: 50,
  });

  const [quantity, setQuantity] = useState(1);

  const [selectedColor, setSelectedColor] = useState("blue");

  const [liked, setLiked] = useState(false);

  const [added, setAdded] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 8,
      y: (x - 0.5) * 10,
    });

    setGlare({
      x: x * 100,
      y: y * 100,
    });
  };

  const resetTilt = () => {
    setTilt({
      x: 0,
      y: 0,
    });

    setGlare({
      x: 50,
      y: 50,
    });
  };

  const addToCart = () => {
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1600);
  };

  const colors = {
    blue: {
      shell: "from-blue-300 via-blue-400 to-blue-500",
      glow: "bg-blue-300",
    },
    cyan: {
      shell: "from-cyan-300 via-cyan-400 to-sky-500",
      glow: "bg-cyan-300",
    },
    violet: {
      shell: "from-violet-300 via-violet-400 to-indigo-500",
      glow: "bg-violet-300",
    },
  };

  const currentColor = colors[selectedColor as keyof typeof colors];

  return (
    <div
      className="flex w-full items-center justify-center py-4"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl transition-transform duration-200"
        style={{
          transform: `
            rotateX(${tilt.x}deg)
            rotateY(${tilt.y}deg)
          `,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-70"
          style={{
            background: `
              radial-gradient(
                circle at
                ${glare.x}% ${glare.y}%,
                rgba(255,255,255,0.65),
                transparent 32%
              )
            `,
          }}
        />

        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <div
            className={`absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full ${currentColor.glow} opacity-30 blur-3xl transition-colors duration-500`}
          />

          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `
                translate(-50%, -50%)
                translateZ(45px)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className={`relative flex h-32 w-32 rotate-[-8deg] items-center justify-center rounded-[32px] bg-gradient-to-br ${currentColor.shell} shadow-[0_25px_50px_rgba(59,130,246,0.25)] transition-all duration-500`}
            >
              <div className="absolute inset-[2px] rounded-[30px] border border-white/40" />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/40 bg-white/25 shadow-inner backdrop-blur">
                <Sparkles size={27} className="text-white" />
              </div>

              <span className="absolute -right-4 -top-4 h-8 w-8 rounded-full border border-white/40 bg-white/30 backdrop-blur" />

              <span className="absolute -bottom-3 -left-3 h-5 w-5 rounded-full border border-white/40 bg-white/30 backdrop-blur" />
            </div>
          </div>

          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-blue-100 bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-blue-600 shadow-sm backdrop-blur">
            <Sparkles size={11} />
            New
          </div>

          <button
            type="button"
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setLiked((current) => !current)}
            className={`absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-all duration-200 ${
              liked
                ? "scale-110 border-red-100 bg-red-50 text-red-500"
                : "border-white/70 bg-white/80 text-zinc-400 hover:scale-110 hover:text-red-500"
            }`}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        <div
          className="relative z-10 p-5"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
                UIUX Collection
              </p>

              <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-950">
                Motion Interface Pack
              </h3>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-blue-700">€39</p>

              <p className="text-[9px] text-zinc-400">one-time</p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Premium interactive UI components with motion, gestures and polished
            interaction states.
          </p>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-zinc-600">
                Accent
              </span>

              <span className="text-[10px] capitalize text-zinc-400">
                {selectedColor}
              </span>
            </div>

            <div className="mt-2 flex gap-2">
              {[
                {
                  id: "blue",
                  className: "bg-blue-300",
                },
                {
                  id: "cyan",
                  className: "bg-cyan-300",
                },
                {
                  id: "violet",
                  className: "bg-violet-300",
                },
              ].map((color) => {
                const active = selectedColor === color.id;

                return (
                  <button
                    key={color.id}
                    type="button"
                    aria-label={`Select ${color.id}`}
                    aria-pressed={active}
                    onClick={() => setSelectedColor(color.id)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                      active
                        ? "scale-110 border-zinc-950"
                        : "border-transparent hover:scale-110"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full ${color.className}`}
                    />

                    {active && (
                      <Check size={11} className="absolute text-zinc-950" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                disabled={quantity === 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Minus size={14} />
              </button>

              <span className="min-w-7 text-center text-xs font-semibold text-zinc-800">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  setQuantity((current) => Math.min(9, current + 1))
                }
                disabled={quantity === 9}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={addToCart}
              className={`group flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                added
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-blue-300 text-zinc-950 shadow-[0_8px_20px_rgba(147,197,253,0.35)] hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_12px_24px_rgba(96,165,250,0.4)]"
              }`}
            >
              {added ? (
                <>
                  <Check size={15} />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingBag
                    size={15}
                    className="transition-transform group-hover:-rotate-6 group-hover:scale-110"
                  />
                  Add to cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const cards: UIComponent[] = [
  {
    id: "basic-card",
    name: "Basic Card",
    description: "A simple content card with title, text and action.",
    category: "Cards",

    preview: (
      <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-md">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-300 text-sm font-semibold text-zinc-950">
          UI
        </div>

        <h3 className="text-lg font-semibold text-zinc-950">Build faster</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Create clean interfaces using reusable and accessible components.
        </p>

        <button
          type="button"
          className="mt-5 rounded-lg bg-blue-300 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-blue-400"
        >
          Learn more
        </button>
      </div>
    ),

    typescript: `function BasicCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-300">
        UI
      </div>

      <h3 className="text-lg font-semibold">
        Build faster
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Create clean interfaces using reusable components.
      </p>

      <button className="mt-5 rounded-lg bg-blue-300 px-4 py-2">
        Learn more
      </button>
    </div>
  );
}

export default BasicCard;`,

    tailwind: `rounded-2xl
border
border-blue-100
bg-white
p-6
shadow-sm

bg-blue-300
text-zinc-950
hover:bg-blue-400`,
  },

  {
    id: "profile-card",
    name: "Profile Card",
    description: "A clean profile card with user information and actions.",
    category: "Cards",

    preview: (
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="h-24 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500" />

        <div className="px-6 pb-6">
          <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-xl font-semibold text-blue-700 shadow-sm">
            AB
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-zinc-950">
              André Babirian
            </h3>

            <p className="mt-1 text-sm font-medium text-blue-600">
              Frontend Developer
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Building modern interfaces with React, TypeScript and Tailwind
              CSS.
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg bg-blue-300 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-blue-400"
            >
              Follow
            </button>

            <button
              type="button"
              className="flex-1 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              Message
            </button>
          </div>
        </div>
      </div>
    ),

    typescript: `function ProfileCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
      <div className="h-24 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500" />

      <div className="p-6">
        <h3 className="font-semibold">
          André Babirian
        </h3>

        <p className="text-blue-600">
          Frontend Developer
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;`,

    tailwind: `rounded-2xl
border
border-blue-100
bg-white

bg-gradient-to-r
from-blue-300
via-blue-400
to-blue-500`,
  },

  {
    id: "product-card",
    name: "Product Card",
    description: "Product card with image area, price and purchase action.",
    category: "Cards",

    preview: (
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="flex h-52 items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-lg">
            <span className="text-4xl font-bold text-blue-300">UI</span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
                Collection
              </p>

              <h3 className="mt-1 text-lg font-semibold text-zinc-950">
                UI Component Pack
              </h3>
            </div>

            <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-lg font-semibold text-blue-700">
              €29
            </span>
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-blue-300 px-4 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-blue-400"
          >
            Add to cart
          </button>
        </div>
      </div>
    ),

    typescript: `function ProductCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
      <div className="bg-blue-100">
        Product image
      </div>

      <button className="bg-blue-300">
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;`,

    tailwind: `rounded-2xl
border-blue-100
bg-white

from-blue-50
via-blue-100
to-blue-200

bg-blue-300
hover:bg-blue-400`,
  },

  {
    id: "interactive-product-showcase-card",
    name: "Interactive Product Showcase Card",
    description:
      "Premium 3D product card with cursor tilt, dynamic glare, selectable accent variants, quantity controls, favorites and animated cart feedback.",
    category: "Cards",

    preview: <InteractiveProductCardPreview />,

    typescript: `import {
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import {
  type MouseEvent,
  useState,
} from "react";

function ProductShowcaseCard() {
  const [tilt, setTilt] =
    useState({
      x: 0,
      y: 0,
    });

  const [glare, setGlare] =
    useState({
      x: 50,
      y: 50,
    });

  const [quantity, setQuantity] =
    useState(1);

  const [color, setColor] =
    useState("blue");

  const [liked, setLiked] =
    useState(false);

  const [added, setAdded] =
    useState(false);

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    setTilt({
      x: (0.5 - y) * 8,
      y: (x - 0.5) * 10,
    });

    setGlare({
      x: x * 100,
      y: y * 100,
    });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      style={{
        transform: \`
          rotateX(\${tilt.x}deg)
          rotateY(\${tilt.y}deg)
        \`,
      }}
      className="rounded-3xl border border-blue-100 bg-white shadow-xl"
    >
      <button
        onClick={() =>
          setLiked(!liked)
        }
      >
        <Heart />
      </button>

      <button
        onClick={() =>
          setQuantity(
            Math.max(
              1,
              quantity - 1,
            ),
          )
        }
      >
        <Minus />
      </button>

      <span>
        {quantity}
      </span>

      <button
        onClick={() =>
          setQuantity(
            Math.min(
              9,
              quantity + 1,
            ),
          )
        }
      >
        <Plus />
      </button>

      <button
        onClick={() => {
          setAdded(true);

          setTimeout(
            () =>
              setAdded(false),
            1600,
          );
        }}
      >
        {added
          ? "Added"
          : "Add to cart"}
      </button>
    </article>
  );
}

export default ProductShowcaseCard;`,

    tailwind: `Card:
rounded-3xl
border
border-blue-100
bg-white
shadow-xl

Product area:
bg-gradient-to-br
from-blue-50
via-white
to-blue-100

Accent:
bg-blue-300
bg-blue-400
bg-blue-500

Favorite:
rounded-full
bg-white/80
backdrop-blur
hover:scale-110

Quantity:
rounded-xl
border-zinc-200
bg-zinc-50

Purchase:
rounded-xl
bg-blue-300
text-zinc-950
hover:bg-blue-400
hover:-translate-y-0.5

Success:
bg-emerald-100
text-emerald-700`,

    javascript: `const MAX_TILT_X = 8;
const MAX_TILT_Y = 10;
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 9;

function calculateCardTilt(
  clientX,
  clientY,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  const x =
    (clientX - rect.left) /
    rect.width;

  const y =
    (clientY - rect.top) /
    rect.height;

  return {
    rotateX:
      (0.5 - y) *
      MAX_TILT_X,

    rotateY:
      (x - 0.5) *
      MAX_TILT_Y,

    glareX:
      x * 100,

    glareY:
      y * 100,
  };
}

function resetCardTilt() {
  return {
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  };
}

function increaseQuantity(
  quantity,
) {
  return Math.min(
    MAX_QUANTITY,
    quantity + 1,
  );
}

function decreaseQuantity(
  quantity,
) {
  return Math.max(
    MIN_QUANTITY,
    quantity - 1,
  );
}

function toggleFavorite(
  currentValue,
) {
  return !currentValue;
}

function createCartFeedback(
  callback,
) {
  callback(true);

  return window.setTimeout(
    () => callback(false),
    1600,
  );
}`,
  },
];
