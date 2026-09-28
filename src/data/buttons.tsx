import type { UIComponent } from "../types/component";

export const buttons: UIComponent[] = [
  {
    id: "primary-button",
    name: "Primary Button",
    description: "Primary action button for important actions.",
    category: "Buttons",

    preview: (
      <button className="rounded-lg bg-blue-300 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-blue-400">
        Get started
      </button>
    ),

    typescript: `function PrimaryButton() {
  return (
    <button className="rounded-lg bg-blue-300 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-blue-400">
      Get started
    </button>
  );
}

export default PrimaryButton;`,

    tailwind: `rounded-lg
bg-blue-300
px-5
py-2.5
text-sm
font-medium
text-zinc-950
transition
hover:bg-blue-400`,
  },

  {
    id: "secondary-button",
    name: "Secondary Button",
    description: "Secondary action with a subtle blue border.",
    category: "Buttons",

    preview: (
      <button className="rounded-lg border border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 hover:border-blue-400">
        Learn more
      </button>
    ),

    typescript: `function SecondaryButton() {
  return (
    <button className="rounded-lg border border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-50 hover:border-blue-400">
      Learn more
    </button>
  );
}

export default SecondaryButton;`,

    tailwind: `rounded-lg
border
border-blue-300
bg-white
px-5
py-2.5
text-sm
font-medium
text-blue-700
transition
hover:bg-blue-50
hover:border-blue-400`,
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
        className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-300 text-xl font-medium text-zinc-950 transition hover:scale-105 hover:bg-blue-400"
      >
        +
      </button>
    ),

    typescript: `function IconButton() {
  return (
    <button
      type="button"
      aria-label="Add item"
      className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-300 text-xl font-medium text-zinc-950 transition hover:scale-105 hover:bg-blue-400"
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
bg-blue-300
text-xl
font-medium
text-zinc-950
transition
hover:scale-105
hover:bg-blue-400`,
  },
];
