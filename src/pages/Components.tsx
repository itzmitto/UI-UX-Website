import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ComponentCard from "../components/library/ComponentCard";
import { useComponentLibrary } from "../context/ComponentLibraryContext";
import { categories, components, slugifyCategory } from "../data/components";

function Components() {
  const { category } = useParams();

  const { openComponent } = useComponentLibrary();

  const activeCategory = categories.find((item) => item.slug === category);

  const filteredComponents = useMemo(() => {
    if (!category) {
      return components;
    }

    return components.filter(
      (component) => slugifyCategory(component.category) === category,
    );
  }, [category]);

  const pageTitle = activeCategory ? activeCategory.name : "All Components";

  if (filteredComponents.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-white">
          No components found
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          This category does not contain any components yet.
        </p>

        <Link
          to="/"
          className="mt-5 inline-flex rounded-lg bg-blue-300 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-blue-400"
        >
          Back to components
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <Link
            to="/"
            className="transition hover:text-blue-600 dark:hover:text-blue-300"
          >
            Components
          </Link>

          <span>/</span>

          <span>{pageTitle}</span>
        </div>

        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-zinc-950 dark:text-white">
          {pageTitle}
        </h1>

        <p className="mt-2 max-w-2xl text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
          Explore{" "}
          {activeCategory ? activeCategory.name.toLowerCase() : "all available"}{" "}
          components. Click a component to inspect its preview, TypeScript,
          Tailwind CSS and JavaScript.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
            {filteredComponents.length} components
          </span>

          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            React
          </span>

          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-medium text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
            TypeScript
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-3.5 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
        {filteredComponents.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            onClick={() => openComponent(component)}
          />
        ))}
      </div>
    </div>
  );
}

export default Components;
