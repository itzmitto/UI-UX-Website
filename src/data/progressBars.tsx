import type { UIComponent } from "../types/component";

export const progressBars: UIComponent[] = [
  {
    id: "basic-progress",
    name: "Basic Progress",
    description: "Simple horizontal progress indicator.",
    category: "Progress Bars",

    preview: (
      <div className="w-full max-w-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700">
            Progress
          </span>

          <span className="text-sm text-zinc-500">
            68%
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200">
          <div className="h-full w-[68%] rounded-full bg-zinc-950" />
        </div>
      </div>
    ),

    typescript: `function BasicProgress() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex justify-between">
        <span className="text-sm font-medium">
          Progress
        </span>

        <span className="text-sm text-zinc-500">
          68%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full w-[68%] rounded-full bg-zinc-950" />
      </div>
    </div>
  );
}

export default BasicProgress;`,

    tailwind: `h-2.5
overflow-hidden
rounded-full
bg-zinc-200

h-full
w-[68%]
rounded-full
bg-zinc-950`,
  },

  {
    id: "success-progress",
    name: "Success Progress",
    description: "Progress bar with completion status.",
    category: "Progress Bars",

    preview: (
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-950">
              Uploading files
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              8 of 10 completed
            </p>
          </div>

          <span className="text-sm font-medium text-emerald-600">
            80%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-4/5 rounded-full bg-emerald-500" />
        </div>
      </div>
    ),

    typescript: `function SuccessProgress() {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">
            Uploading files
          </p>

          <p className="text-xs text-zinc-500">
            8 of 10 completed
          </p>
        </div>

        <span className="text-emerald-600">
          80%
        </span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-zinc-100">
        <div className="h-full w-4/5 rounded-full bg-emerald-500" />
      </div>
    </div>
  );
}

export default SuccessProgress;`,

    tailwind: `rounded-xl
border
p-4

h-2
rounded-full
bg-zinc-100

w-4/5
bg-emerald-500`,
  },

  {
    id: "segmented-progress",
    name: "Segmented Progress",
    description: "Progress represented by individual steps.",
    category: "Progress Bars",

    preview: (
      <div className="w-full max-w-sm">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 flex-1 rounded-full ${
                step < 3
                  ? "bg-zinc-950"
                  : "bg-zinc-200"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-sm text-zinc-500">
          Step 3 of 5
        </p>
      </div>
    ),

    typescript: `function SegmentedProgress() {
  return (
    <div>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={\`h-2 flex-1 rounded-full \${
              step < 3
                ? "bg-zinc-950"
                : "bg-zinc-200"
            }\`}
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-zinc-500">
        Step 3 of 5
      </p>
    </div>
  );
}

export default SegmentedProgress;`,

    tailwind: `flex
gap-2

h-2
flex-1
rounded-full`,
  },
];