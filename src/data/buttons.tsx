import type { UIComponent } from "../types/component";

export const buttons: UIComponent[] = [
  {
    id: "primary-button",
    name: "Primary Button",
    description: "Primary action button for important actions.",
    category: "Buttons",

    preview: (
      <button className="rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
        Get started
      </button>
    ),

    typescript: `function PrimaryButton() {
  return (
    <button className="rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
      Get started
    </button>
  );
}

export default PrimaryButton;`,

    tailwind: `rounded-lg
bg-zinc-950
px-5
py-2.5
text-sm
font-medium
text-white
transition
hover:bg-zinc-800`,
  },

  {
    id: "secondary-button",
    name: "Secondary Button",
    description: "Secondary action with a subtle border.",
    category: "Buttons",

    preview: (
      <button className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100">
        Learn more
      </button>
    ),

    typescript: `function SecondaryButton() {
  return (
    <button className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100">
      Learn more
    </button>
  );
}

export default SecondaryButton;`,

    tailwind: `rounded-lg
border
border-zinc-300
bg-white
px-5
py-2.5
text-sm
font-medium
text-zinc-800
transition
hover:bg-zinc-100`,
  },

  {
    id: "icon-button",
    name: "Icon Button",
    description: "Compact button for icon based actions.",
    category: "Buttons",

    preview: (
      <button
        type="button"
        aria-label="Add item"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-xl text-white transition hover:scale-105 hover:bg-zinc-800"
      >
        +
      </button>
    ),

    typescript: `function IconButton() {
  return (
    <button
      type="button"
      aria-label="Add item"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-xl text-white transition hover:scale-105 hover:bg-zinc-800"
    >
      +
    </button>
  );
}

export default IconButton;`,

    tailwind: `flex
h-11
w-11
items-center
justify-center
rounded-full
bg-zinc-950
text-xl
text-white
transition
hover:scale-105
hover:bg-zinc-800`,
  },
];