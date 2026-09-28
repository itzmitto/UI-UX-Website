import {
  FilePlus2,
  Search,
  UploadCloud,
} from "lucide-react";
import type { UIComponent } from "../types/component";

export const emptyStates: UIComponent[] = [
  {
    id: "basic-empty-state",
    name: "Basic Empty State",
    description: "Empty state with an action for creating new content.",
    category: "Empty States",

    preview: (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
          <FilePlus2 size={20} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-zinc-950">
          No projects yet
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Create your first project to get started.
        </p>

        <button className="mt-5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
          Create project
        </button>
      </div>
    ),

    typescript: `import { FilePlus2 } from "lucide-react";

function BasicEmptyState() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
        <FilePlus2 />
      </div>

      <h3 className="mt-4 font-semibold">
        No projects yet
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Create your first project to get started.
      </p>

      <button className="mt-5">
        Create project
      </button>
    </div>
  );
}

export default BasicEmptyState;`,

    tailwind: `text-center

mx-auto
flex
h-12
w-12
items-center
justify-center
rounded-xl
bg-zinc-100`,
  },

  {
    id: "search-empty-state",
    name: "Search Empty State",
    description: "Empty search result state with helpful feedback.",
    category: "Empty States",

    preview: (
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
          <Search
            size={19}
            className="text-zinc-400"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-zinc-950">
          No results found
        </h3>

        <p className="mt-2 text-sm text-zinc-500">
          Try changing your search or filters.
        </p>

        <button className="mt-4 text-sm font-medium text-zinc-950 underline underline-offset-4">
          Clear search
        </button>
      </div>
    ),

    typescript: `import { Search } from "lucide-react";

function SearchEmptyState() {
  return (
    <div className="text-center">
      <Search />

      <h3 className="mt-4 font-semibold">
        No results found
      </h3>

      <p className="mt-2 text-sm text-zinc-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}

export default SearchEmptyState;`,

    tailwind: `text-center

rounded-full
bg-zinc-100`,
  },

  {
    id: "upload-empty-state",
    name: "Upload Empty State",
    description: "Upload dropzone style empty state.",
    category: "Empty States",

    preview: (
      <div className="w-full max-w-md rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
        <UploadCloud
          size={28}
          className="mx-auto text-zinc-400"
        />

        <h3 className="mt-4 text-sm font-semibold text-zinc-950">
          Upload a file
        </h3>

        <p className="mt-2 text-xs text-zinc-500">
          Drag and drop or click to browse.
        </p>

        <button className="mt-5 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700">
          Browse files
        </button>
      </div>
    ),

    typescript: `import { UploadCloud } from "lucide-react";

function UploadEmptyState() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center">
      <UploadCloud className="mx-auto" />

      <h3 className="mt-4 font-semibold">
        Upload a file
      </h3>

      <p className="mt-2 text-xs text-zinc-500">
        Drag and drop or click to browse.
      </p>

      <button className="mt-5">
        Browse files
      </button>
    </div>
  );
}

export default UploadEmptyState;`,

    tailwind: `rounded-2xl
border-2
border-dashed
border-zinc-300
bg-zinc-50
px-6
py-10
text-center`,
  },
];