import type { UIComponent } from "../types/component";

export const toggles: UIComponent[] = [
  {
    id: "basic-toggle",
    name: "Basic Toggle",
    description: "A simple switch for enabling and disabling settings.",
    category: "Toggles",

    preview: (
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" className="peer sr-only" />

        <span className="relative h-6 w-11 rounded-full bg-zinc-300 transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-zinc-950 peer-checked:after:translate-x-5" />

        <span className="text-sm font-medium text-zinc-700">
          Enable feature
        </span>
      </label>
    ),

    typescript: `function BasicToggle() {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        className="peer sr-only"
      />

      <span className="relative h-6 w-11 rounded-full bg-zinc-300 transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-zinc-950 peer-checked:after:translate-x-5" />

      <span className="text-sm font-medium text-zinc-700">
        Enable feature
      </span>
    </label>
  );
}

export default BasicToggle;`,

    tailwind: `peer
sr-only

relative
h-6
w-11
rounded-full
bg-zinc-300
transition
peer-checked:bg-zinc-950`,
  },

  {
    id: "settings-toggle",
    name: "Settings Toggle",
    description: "Toggle with a title and supporting description.",
    category: "Toggles",

    preview: (
      <div className="flex w-full max-w-sm items-center justify-between gap-6 rounded-xl border border-zinc-200 bg-white p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-950">
            Dark notifications
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Receive notifications outside work hours.
          </p>
        </div>

        <label className="cursor-pointer">
          <input type="checkbox" defaultChecked className="peer sr-only" />

          <span className="relative block h-6 w-11 rounded-full bg-zinc-300 transition after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-zinc-950 peer-checked:after:translate-x-5" />
        </label>
      </div>
    ),

    typescript: `function SettingsToggle() {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-zinc-200 p-4">
      <div>
        <p className="text-sm font-semibold">
          Dark notifications
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          Receive notifications outside work hours.
        </p>
      </div>

      <label>
        <input type="checkbox" className="peer sr-only" />

        <span className="relative block h-6 w-11 rounded-full bg-zinc-300 peer-checked:bg-zinc-950" />
      </label>
    </div>
  );
}

export default SettingsToggle;`,

    tailwind: `flex
items-center
justify-between
gap-6
rounded-xl
border
border-zinc-200
p-4`,
  },

  {
    id: "compact-toggle",
    name: "Compact Toggle",
    description: "A smaller toggle for compact interfaces.",
    category: "Toggles",

    preview: (
      <label className="cursor-pointer">
        <input type="checkbox" className="peer sr-only" />

        <span className="relative block h-5 w-9 rounded-full bg-zinc-300 transition after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-emerald-500 peer-checked:after:translate-x-4" />
      </label>
    ),

    typescript: `function CompactToggle() {
  return (
    <label className="cursor-pointer">
      <input
        type="checkbox"
        className="peer sr-only"
      />

      <span className="relative block h-5 w-9 rounded-full bg-zinc-300 transition after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white peer-checked:bg-emerald-500 peer-checked:after:translate-x-4" />
    </label>
  );
}

export default CompactToggle;`,

    tailwind: `h-5
w-9
rounded-full
bg-zinc-300
peer-checked:bg-emerald-500`,
  },
];
