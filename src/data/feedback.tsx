import type { UIComponent } from "../types/component";

export const feedback: UIComponent[] = [
  {
    id: "alert",
    name: "Alert",
    description: "Informational alert for important messages.",
    category: "Feedback",

    preview: (
      <div
        role="alert"
        className="w-full max-w-md rounded-xl border border-blue-200 bg-blue-50 p-4"
      >
        <div className="flex gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            i
          </div>

          <div>
            <p className="text-sm font-semibold text-blue-950">Information</p>

            <p className="mt-1 text-sm leading-5 text-blue-700">
              Your changes have been saved successfully.
            </p>
          </div>
        </div>
      </div>
    ),

    typescript: `function Alert() {
  return (
    <div
      role="alert"
      className="rounded-xl border border-blue-200 bg-blue-50 p-4"
    >
      <div className="flex gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
          i
        </div>

        <div>
          <p className="text-sm font-semibold text-blue-950">
            Information
          </p>

          <p className="mt-1 text-sm text-blue-700">
            Your changes have been saved successfully.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Alert;`,

    tailwind: `rounded-xl
border
border-blue-200
bg-blue-50
p-4`,
  },

  {
    id: "toast",
    name: "Toast",
    description: "Compact notification for short-lived feedback.",
    category: "Feedback",

    preview: (
      <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
          ✓
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-950">Changes saved</p>

          <p className="mt-0.5 text-xs text-zinc-500">
            Your profile has been updated.
          </p>
        </div>

        <button
          aria-label="Close"
          className="text-zinc-400 hover:text-zinc-950"
        >
          ×
        </button>
      </div>
    ),

    typescript: `function Toast() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-lg">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        ✓
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-950">
          Changes saved
        </p>

        <p className="text-xs text-zinc-500">
          Your profile has been updated.
        </p>
      </div>

      <button aria-label="Close">
        ×
      </button>
    </div>
  );
}

export default Toast;`,

    tailwind: `flex
items-center
gap-3
rounded-xl
border
border-zinc-200
bg-white
p-4
shadow-lg`,
  },

  {
    id: "badge",
    name: "Badge",
    description: "Small status badge for labels and metadata.",
    category: "Feedback",

    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          Default
        </span>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          Active
        </span>

        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
          Error
        </span>
      </div>
    ),

    typescript: `function Badges() {
  return (
    <div className="flex gap-3">
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
        Default
      </span>

      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        Active
      </span>

      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        Error
      </span>
    </div>
  );
}

export default Badges;`,

    tailwind: `rounded-full
px-3
py-1
text-xs
font-medium`,
  },
];
