import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-xl font-bold text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
          404
        </div>

        <p className="mt-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Page not found
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
          This page doesn't exist.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          The page you are looking for may have been moved, deleted or the URL
          may be incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <Home size={16} />
            Go home
          </Link>

          <Link
            to="/components"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ArrowLeft size={16} />
            Browse components
          </Link>
        </div>

        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-xs text-zinc-400">Error code</p>

          <p className="mt-1 font-mono text-sm text-zinc-600 dark:text-zinc-300">
            404_NOT_FOUND
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
