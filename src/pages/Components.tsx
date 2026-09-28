import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ComponentCard from "../components/library/ComponentCard";
import ComponentModal from "../components/library/ComponentModal";
import { components } from "../data/components";
import type { UIComponent } from "../types/component";

function Components() {
  const { category } = useParams();

  const [selectedComponent, setSelectedComponent] =
    useState<UIComponent | null>(null);

  const filteredComponents = useMemo(() => {
    if (!category) {
      return components;
    }

    return components.filter(
      (component) =>
        component.category.toLowerCase() === category.toLowerCase(),
    );
  }, [category]);

  const pageTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "All Components";

  const groupedComponents = useMemo(() => {
    return filteredComponents.reduce<Record<string, UIComponent[]>>(
      (groups, component) => {
        if (!groups[component.category]) {
          groups[component.category] = [];
        }

        groups[component.category].push(component);

        return groups;
      },
      {},
    );
  }, [filteredComponents]);

  return (
    <>
      <div>
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Components
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            {pageTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Reusable React, TypeScript and Tailwind CSS components.
            Click on a component to inspect its code and responsive preview.
          </p>
        </div>

        {filteredComponents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-20 text-center">
            <h2 className="text-lg font-semibold text-zinc-950">
              No components yet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Components for this category will be added later.
            </p>
          </div>
        ) : (
          <div className="space-y-14">
            {Object.entries(groupedComponents).map(
              ([categoryName, categoryComponents]) => (
                <section key={categoryName}>
                  <div className="mb-5 flex items-end justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-zinc-950">
                        {categoryName}
                      </h2>

                      <p className="mt-1 text-sm text-zinc-500">
                        Explore available {categoryName.toLowerCase()}.
                      </p>
                    </div>

                    <span className="text-sm text-zinc-400">
                      {categoryComponents.length} components
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
                    {categoryComponents.map((component) => (
                      <ComponentCard
                        key={component.id}
                        component={component}
                        onClick={() =>
                          setSelectedComponent(component)
                        }
                      />
                    ))}
                  </div>
                </section>
              ),
            )}
          </div>
        )}
      </div>

      <ComponentModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
      />
    </>
  );
}

export default Components;