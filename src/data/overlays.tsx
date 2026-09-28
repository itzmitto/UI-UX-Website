import type { UIComponent } from "../types/component";

export const overlays: UIComponent[] = [
  {
    id: "modal",
    name: "Modal",
    description: "Centered dialog for focused user interactions.",
    category: "Overlays",

    preview: (
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-zinc-950">
              Delete project?
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              This action cannot be undone.
            </p>
          </div>

          <button className="text-zinc-400 hover:text-zinc-950">×</button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
            Cancel
          </button>

          <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    ),

    typescript: `import { useState } from "react";

function Modal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open modal
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold">
              Delete project?
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setOpen(false)}>
                Cancel
              </button>

              <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;`,

    tailwind: `fixed
inset-0
flex
items-center
justify-center
bg-black/40
p-4

rounded-2xl
bg-white
p-6
shadow-xl`,
  },

  {
    id: "dropdown",
    name: "Dropdown",
    description: "Compact menu for grouped actions.",
    category: "Overlays",

    preview: (
      <div className="w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg">
        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100">
          Edit profile
        </button>

        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-100">
          Settings
        </button>

        <div className="my-1 border-t border-zinc-200" />

        <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
          Sign out
        </button>
      </div>
    ),

    typescript: `function Dropdown() {
  return (
    <div className="w-52 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg">
      <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100">
        Edit profile
      </button>

      <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100">
        Settings
      </button>

      <div className="my-1 border-t border-zinc-200" />

      <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50">
        Sign out
      </button>
    </div>
  );
}

export default Dropdown;`,

    tailwind: `w-52
rounded-xl
border
border-zinc-200
bg-white
p-1.5
shadow-lg`,
  },

  {
    id: "tooltip",
    name: "Tooltip",
    description: "Small contextual message shown on hover.",
    category: "Overlays",

    preview: (
      <div className="group relative">
        <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700">
          Hover me
        </button>

        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-950 px-2.5 py-1.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
          Helpful information
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-950" />
        </div>
      </div>
    ),

    typescript: `function Tooltip() {
  return (
    <div className="group relative inline-block">
      <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm">
        Hover me
      </button>

      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-950 px-2.5 py-1.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
        Helpful information
      </div>
    </div>
  );
}

export default Tooltip;`,

    tailwind: `group
relative

absolute
bottom-full
left-1/2
-translate-x-1/2
rounded-md
bg-zinc-950
px-2.5
py-1.5
text-xs
text-white
opacity-0
transition
group-hover:opacity-100`,
  },
];
