import {
  Code2,
  Copy,
  MonitorSmartphone,
  Palette,
} from "lucide-react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
          Getting Started
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Introduction
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          UIUX is a reusable component library built with React,
          TypeScript and Tailwind CSS. Browse components, preview them
          at different screen sizes and copy the implementation into
          your own project.
        </p>
      </div>

      <div className="border-t border-zinc-200 pt-10 dark:border-zinc-800">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          What is UIUX?
        </h2>

        <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          The library is designed to make finding and reusing interface
          components easier. Each component includes a visual preview,
          TypeScript code and its Tailwind CSS classes.
        </p>

        <p className="mt-4 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          Components can also be previewed at desktop, tablet and phone
          widths directly inside the component viewer.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
          Features
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Code2 size={18} />
            </div>

            <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">
              TypeScript
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Components include readable React and TypeScript source
              code.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Palette size={18} />
            </div>

            <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">
              Tailwind CSS
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Styling is built using reusable Tailwind utility classes.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <MonitorSmartphone size={18} />
            </div>

            <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">
              Responsive previews
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Test components at desktop, tablet and phone widths.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Copy size={18} />
            </div>

            <h3 className="mt-4 font-semibold text-zinc-950 dark:text-white">
              Copy instantly
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Copy component code directly from the component viewer.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link
          to="/docs/installation"
          className="group flex items-center justify-between rounded-xl border border-zinc-200 p-5 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <div>
            <p className="text-xs text-zinc-400">
              Next
            </p>

            <p className="mt-1 font-medium text-zinc-950 dark:text-white">
              Installation
            </p>
          </div>

          <span className="text-zinc-400 transition group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Introduction;