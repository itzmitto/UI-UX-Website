import { Link } from "react-router-dom";
import { categories, components } from "../data/components";

function Home() {
  return (
    <div className="pb-24">
      <div className="mb-8">
        <h1 className="text-[28px] font-bold tracking-tight text-zinc-950 dark:text-white">
          All Components (React)
        </h1>

        <p className="mt-2 text-[13px] leading-5 text-zinc-500 dark:text-zinc-400">
          Explore the full list of components available in the library. More are
          on the way.
        </p>
      </div>

      <div className="space-y-11">
        {categories.map((category) => {
          const categoryComponents = components
            .filter((component) => component.category === category.name)
            .slice(0, 6);

          if (categoryComponents.length === 0) {
            return null;
          }

          return (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-[125px]"
            >
              <Link
                to={`/components/${category.slug}`}
                className="inline-block"
              >
                <h2 className="text-[18px] font-semibold tracking-tight text-zinc-950 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-300">
                  {category.name}
                </h2>
              </Link>

              <div className="mt-4 grid grid-cols-1 gap-x-3.5 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
                {categoryComponents.map((component) => (
                  <Link
                    key={component.id}
                    to={`/components/${category.slug}`}
                    aria-label={`View ${category.name}`}
                    className="group block min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-3"
                  >
                    <div className="relative flex h-[152px] items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:bg-blue-50/40 group-hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-blue-800 dark:group-hover:bg-blue-950/20">
                      <div className="pointer-events-none flex h-full w-full scale-[0.87] items-center justify-center">
                        {component.preview}
                      </div>

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-blue-300 transition-transform duration-200 group-hover:scale-x-100" />
                    </div>

                    <p className="mt-2.5 truncate text-[12px] font-medium text-zinc-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
                      {component.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
