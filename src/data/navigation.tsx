import type { UIComponent } from "../types/component";

export const navigation: UIComponent[] = [
  {
    id: "navbar",
    name: "Navbar",
    description: "Simple responsive-style navigation bar.",
    category: "Navigation",

    preview: (
      <nav className="flex w-full max-w-2xl items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
        <div className="font-semibold text-zinc-950">Acme</div>

        <div className="flex items-center gap-5 text-sm text-zinc-500">
          <a href="#home" className="hover:text-zinc-950">
            Home
          </a>

          <a href="#features" className="hover:text-zinc-950">
            Features
          </a>

          <a href="#pricing" className="hover:text-zinc-950">
            Pricing
          </a>
        </div>

        <button className="rounded-lg bg-zinc-950 px-3 py-2 text-xs font-medium text-white">
          Get started
        </button>
      </nav>
    ),

    typescript: `function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4">
      <div className="font-semibold text-zinc-950">
        Acme
      </div>

      <div className="flex items-center gap-6 text-sm text-zinc-500">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
      </div>

      <button className="rounded-lg bg-zinc-950 px-4 py-2 text-sm text-white">
        Get started
      </button>
    </nav>
  );
}

export default Navbar;`,

    tailwind: `flex
items-center
justify-between
border-b
border-zinc-200
bg-white
px-6
py-4`,
  },

  {
    id: "tabs",
    name: "Tabs",
    description: "Horizontal tabs for switching between sections.",
    category: "Navigation",

    preview: (
      <div className="flex rounded-xl border border-zinc-200 bg-white p-1">
        <button className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
          Overview
        </button>

        <button className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
          Analytics
        </button>

        <button className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
          Settings
        </button>
      </div>
    ),

    typescript: `function Tabs() {
  return (
    <div className="flex rounded-xl border border-zinc-200 bg-white p-1">
      <button className="rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white">
        Overview
      </button>

      <button className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
        Analytics
      </button>

      <button className="rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-zinc-100">
        Settings
      </button>
    </div>
  );
}

export default Tabs;`,

    tailwind: `flex
rounded-xl
border
border-zinc-200
bg-white
p-1`,
  },

  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    description: "Breadcrumb navigation for hierarchical pages.",
    category: "Navigation",

    preview: (
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <a href="#home" className="text-zinc-400 hover:text-zinc-950">
          Home
        </a>

        <span className="text-zinc-300">/</span>

        <a href="#components" className="text-zinc-400 hover:text-zinc-950">
          Components
        </a>

        <span className="text-zinc-300">/</span>

        <span className="font-medium text-zinc-950">Buttons</span>
      </nav>
    ),

    typescript: `function Breadcrumbs() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm"
    >
      <a href="/" className="text-zinc-400 hover:text-zinc-950">
        Home
      </a>

      <span className="text-zinc-300">/</span>

      <a
        href="/components"
        className="text-zinc-400 hover:text-zinc-950"
      >
        Components
      </a>

      <span className="text-zinc-300">/</span>

      <span className="font-medium text-zinc-950">
        Buttons
      </span>
    </nav>
  );
}

export default Breadcrumbs;`,

    tailwind: `flex
items-center
gap-2
text-sm`,
  },
];
