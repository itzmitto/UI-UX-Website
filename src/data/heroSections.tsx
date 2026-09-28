import type { UIComponent } from "../types/component";

export const heroSections: UIComponent[] = [
  {
    id: "centered-hero",
    name: "Centered Hero",
    description: "Centered hero section with primary and secondary actions.",
    category: "Hero Sections",

    preview: (
      <section className="w-full max-w-2xl px-4 py-8 text-center">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
          New release
        </span>

        <h2 className="mt-5 text-3xl font-bold tracking-tight text-zinc-950">
          Build better interfaces.
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-500">
          A collection of reusable components for building modern web
          applications faster.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white">
            Get started
          </button>

          <button className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700">
            Learn more
          </button>
        </div>
      </section>
    ),

    typescript: `function CenteredHero() {
  return (
    <section className="px-6 py-24 text-center">
      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs">
        New release
      </span>

      <h1 className="mt-5 text-5xl font-bold tracking-tight">
        Build better interfaces.
      </h1>

      <p className="mx-auto mt-4 max-w-xl text-zinc-500">
        A collection of reusable components for modern web apps.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <button>Get started</button>
        <button>Learn more</button>
      </div>
    </section>
  );
}

export default CenteredHero;`,

    tailwind: `px-6
py-24
text-center

text-5xl
font-bold
tracking-tight`,
  },

  {
    id: "split-hero",
    name: "Split Hero",
    description: "Two-column hero with content and visual area.",
    category: "Hero Sections",

    preview: (
      <section className="grid w-full max-w-3xl gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            UI Library
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
            Design faster.
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Start with polished components instead of rebuilding common
            interfaces.
          </p>

          <button className="mt-5 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white">
            Explore
          </button>
        </div>

        <div className="flex min-h-52 items-center justify-center rounded-2xl bg-zinc-100">
          <div className="rounded-xl bg-white px-8 py-6 text-xl font-bold text-zinc-300 shadow-sm">
            UI
          </div>
        </div>
      </section>
    ),

    typescript: `function SplitHero() {
  return (
    <section className="grid gap-12 md:grid-cols-2 md:items-center">
      <div>
        <h1 className="text-5xl font-bold">
          Design faster.
        </h1>

        <p className="mt-4 text-zinc-500">
          Start with polished components instead of rebuilding common interfaces.
        </p>

        <button className="mt-6">
          Explore
        </button>
      </div>

      <div className="min-h-80 rounded-2xl bg-zinc-100" />
    </section>
  );
}

export default SplitHero;`,

    tailwind: `grid
gap-12
md:grid-cols-2
md:items-center`,
  },

  {
    id: "dark-hero",
    name: "Dark Hero",
    description: "Dark hero section with a strong call to action.",
    category: "Hero Sections",

    preview: (
      <section className="w-full max-w-3xl overflow-hidden rounded-2xl bg-zinc-950 px-6 py-10 text-white">
        <p className="text-sm font-medium text-zinc-400">
          Start building today
        </p>

        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight">
          Everything you need for your next interface.
        </h2>

        <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
          Responsive React components with TypeScript and Tailwind CSS.
        </p>

        <button className="mt-6 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200">
          Browse components
        </button>
      </section>
    ),

    typescript: `function DarkHero() {
  return (
    <section className="rounded-3xl bg-zinc-950 px-8 py-20 text-white">
      <p className="text-zinc-400">
        Start building today
      </p>

      <h1 className="mt-3 text-5xl font-bold">
        Everything you need for your next interface.
      </h1>

      <p className="mt-4 text-zinc-400">
        Responsive React components with TypeScript and Tailwind CSS.
      </p>

      <button className="mt-6 rounded-lg bg-white px-4 py-2 text-zinc-950">
        Browse components
      </button>
    </section>
  );
}

export default DarkHero;`,

    tailwind: `rounded-3xl
bg-zinc-950
px-8
py-20
text-white`,
  },
];