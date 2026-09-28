import type { UIComponent } from "../types/component";

export const inputs: UIComponent[] = [
  {
    id: "text-input",
    name: "Text Input",
    description: "A clean text input with label and focus state.",
    category: "Inputs",

    preview: (
      <div className="w-full max-w-sm">
        <label
          htmlFor="preview-name"
          className="mb-2 block text-sm font-medium text-zinc-800"
        >
          Name
        </label>

        <input
          id="preview-name"
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>
    ),

    typescript: `function TextInput() {
  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor="name"
        className="mb-2 block text-sm font-medium text-zinc-800"
      >
        Name
      </label>

      <input
        id="name"
        type="text"
        placeholder="Enter your name"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
      />
    </div>
  );
}

export default TextInput;`,

    tailwind: `w-full
rounded-lg
border
border-zinc-300
bg-white
px-4
py-2.5
text-sm
text-zinc-950
outline-none
transition
placeholder:text-zinc-400
focus:border-zinc-950
focus:ring-2
focus:ring-zinc-950/10`,
  },

  {
    id: "search-input",
    name: "Search Input",
    description: "Search field with a simple search icon.",
    category: "Inputs",

    preview: (
      <div className="relative w-full max-w-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />
      </div>
    ),

    typescript: `function SearchInput() {
  return (
    <div className="relative w-full max-w-sm">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
      />
    </div>
  );
}

export default SearchInput;`,

    tailwind: `relative
w-full
max-w-sm

input:
w-full
rounded-lg
border
border-zinc-300
bg-white
py-2.5
pl-10
pr-4
text-sm
outline-none
transition
focus:border-zinc-950
focus:ring-2
focus:ring-zinc-950/10`,
  },

  {
    id: "password-input",
    name: "Password Input",
    description: "Password input with label and helper text.",
    category: "Inputs",

    preview: (
      <div className="w-full max-w-sm">
        <label
          htmlFor="preview-password"
          className="mb-2 block text-sm font-medium text-zinc-800"
        >
          Password
        </label>

        <input
          id="preview-password"
          type="password"
          placeholder="Enter password"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        <p className="mt-2 text-xs text-zinc-500">
          Must contain at least 8 characters.
        </p>
      </div>
    ),

    typescript: `function PasswordInput() {
  return (
    <div className="w-full max-w-sm">
      <label
        htmlFor="password"
        className="mb-2 block text-sm font-medium text-zinc-800"
      >
        Password
      </label>

      <input
        id="password"
        type="password"
        placeholder="Enter password"
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
      />

      <p className="mt-2 text-xs text-zinc-500">
        Must contain at least 8 characters.
      </p>
    </div>
  );
}

export default PasswordInput;`,

    tailwind: `w-full
rounded-lg
border
border-zinc-300
bg-white
px-4
py-2.5
text-sm
text-zinc-950
outline-none
transition
placeholder:text-zinc-400
focus:border-zinc-950
focus:ring-2
focus:ring-zinc-950/10`,
  },
];