import { Boxes, Code2, Layers3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { categories, components, slugifyCategory } from "../../data/components";

type TocItem = {
  id: string;
  label: string;
};

function RightToc() {
  const location = useLocation();

  const [progress, setProgress] = useState(0);

  const [activeItem, setActiveItem] = useState("");

  const currentCategorySlug = location.pathname.startsWith("/components/")
    ? location.pathname.replace("/components/", "").split("/")[0]
    : null;

  const currentCategory = categories.find(
    (category) => category.slug === currentCategorySlug,
  );

  const tocItems = useMemo<TocItem[]>(() => {
    if (location.pathname === "/") {
      return categories.map((category) => ({
        id: category.slug,
        label: category.name,
      }));
    }

    if (currentCategory) {
      return components
        .filter(
          (component) =>
            slugifyCategory(component.category) === currentCategory.slug,
        )
        .map((component) => ({
          id: `component-${component.id}`,
          label: component.name,
        }));
    }

    return [];
  }, [location.pathname, currentCategory]);

  useEffect(() => {
    if (tocItems.length === 0) {
      return;
    }

    setActiveItem(tocItems[0].id);

    let frame = 0;

    const updateScrollState = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const sections = tocItems
          .map((item) => ({
            item,
            element: document.getElementById(item.id),
          }))
          .filter(
            (
              section,
            ): section is {
              item: TocItem;
              element: HTMLElement;
            } => section.element !== null,
          );

        if (sections.length === 0) {
          return;
        }

        const marker = 135;

        let current = sections[0].item.id;

        for (let index = 0; index < sections.length; index++) {
          const rect = sections[index].element.getBoundingClientRect();

          if (rect.top <= marker) {
            current = sections[index].item.id;
          }
        }

        setActiveItem(current);

        const first = sections[0].element;

        const last = sections[sections.length - 1].element;

        const firstRect = first.getBoundingClientRect();

        const lastRect = last.getBoundingClientRect();

        const start = window.scrollY + firstRect.top - marker;

        const end =
          window.scrollY + lastRect.bottom - window.innerHeight * 0.45;

        const distance = Math.max(1, end - start);

        const nextProgress = (window.scrollY - start) / distance;

        setProgress(Math.min(1, Math.max(0, nextProgress)));
      });
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    window.addEventListener("resize", updateScrollState);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("scroll", updateScrollState);

      window.removeEventListener("resize", updateScrollState);
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return <div className="hidden xl:block" />;
  }

  const interactiveCount = components.filter((component) =>
    Boolean(component.javascript),
  ).length;

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-[124px] py-7">
        <p className="mb-3 pl-5 text-[11px] font-medium text-zinc-400">
          On this page
        </p>

        <div className="relative">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-zinc-200 dark:bg-zinc-800" />

          <div
            className="absolute left-0 top-0 w-[2px] rounded-full bg-blue-300 shadow-[0_0_9px_rgba(147,197,253,0.65)] transition-[height] duration-150"
            style={{
              height: `${progress * 100}%`,
            }}
          />

          <nav className="space-y-0.5 pl-5">
            {tocItems.map((item) => {
              const active = activeItem === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative block rounded-md px-2 py-1 text-[11px] leading-5 transition-all duration-200 ${
                    active
                      ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                      : "text-zinc-500 hover:bg-blue-50/70 hover:text-blue-700 dark:text-zinc-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                  }`}
                >
                  {active && (
                    <span className="absolute -left-[21px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border-2 border-white bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.95)] dark:border-zinc-950" />
                  )}

                  <span className="block truncate">{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/40 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/20">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-500/10 dark:text-blue-300">
              <Boxes size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200">
                {currentCategory
                  ? `${currentCategory.name} library`
                  : "Library status"}
              </p>

              <p className="truncate text-[9px] text-zinc-400">
                Interactive React components
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-blue-100 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Layers3 size={11} />

                <span className="text-[8px] uppercase tracking-wide">
                  Components
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                {currentCategory ? tocItems.length : components.length}
              </p>
            </div>

            <div className="rounded-lg border border-blue-100 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <Code2 size={11} />

                <span className="text-[8px] uppercase tracking-wide">
                  Interactive
                </span>
              </div>

              <p className="mt-1 text-sm font-semibold text-zinc-950 dark:text-white">
                {currentCategory
                  ? components.filter(
                      (component) =>
                        slugifyCategory(component.category) ===
                          currentCategory.slug && Boolean(component.javascript),
                    ).length
                  : interactiveCount}
              </p>
            </div>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-blue-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-blue-300 transition-[width] duration-300"
              style={{
                width: `${Math.max(8, progress * 100)}%`,
              }}
            />
          </div>

          <p className="mt-2 text-[9px] leading-4 text-zinc-400">
            {currentCategory
              ? `Explore every ${currentCategory.name.toLowerCase()} component.`
              : "Scroll through the library to explore every category."}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default RightToc;
