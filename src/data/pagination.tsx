import type { UIComponent } from "../types/component";

export const pagination: UIComponent[] = [
  {
    id: "basic-pagination",
    name: "Basic Pagination",
    description: "Standard numbered pagination controls.",
    category: "Pagination",

    preview: (
      <nav className="flex items-center gap-1">
        <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
          ←
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`h-9 w-9 rounded-lg text-sm ${
              page === 1
                ? "bg-zinc-950 text-white"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
          →
        </button>
      </nav>
    ),

    typescript: `function Pagination() {
  return (
    <nav className="flex items-center gap-1">
      <button>←</button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className="h-9 w-9 rounded-lg"
        >
          {page}
        </button>
      ))}

      <button>→</button>
    </nav>
  );
}

export default Pagination;`,

    tailwind: `flex
items-center
gap-1

h-9
w-9
rounded-lg
text-sm`,
  },

  {
    id: "compact-pagination",
    name: "Compact Pagination",
    description: "Compact previous and next pagination.",
    category: "Pagination",

    preview: (
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100">
          Previous
        </button>

        <span className="text-sm text-zinc-500">2 / 12</span>

        <button className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          Next
        </button>
      </div>
    ),

    typescript: `function CompactPagination() {
  return (
    <div className="flex items-center gap-3">
      <button>Previous</button>

      <span className="text-sm text-zinc-500">
        2 / 12
      </span>

      <button>Next</button>
    </div>
  );
}

export default CompactPagination;`,

    tailwind: `flex
items-center
gap-3`,
  },

  {
    id: "results-pagination",
    name: "Results Pagination",
    description: "Pagination with result count information.",
    category: "Pagination",

    preview: (
      <div className="flex w-full max-w-lg items-center justify-between">
        <p className="text-sm text-zinc-500">Showing 1–10 of 96</p>

        <div className="flex gap-2">
          <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm">
            Previous
          </button>

          <button className="rounded-lg border border-zinc-200 px-3 py-2 text-sm">
            Next
          </button>
        </div>
      </div>
    ),

    typescript: `function ResultsPagination() {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-zinc-500">
        Showing 1–10 of 96
      </p>

      <div className="flex gap-2">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default ResultsPagination;`,

    tailwind: `flex
items-center
justify-between`,
  },
];
