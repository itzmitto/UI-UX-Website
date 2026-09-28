import type { UIComponent } from "../../types/component";

type ComponentCardProps = {
  component: UIComponent;
  onClick: () => void;
};

function ComponentCard({ component, onClick }: ComponentCardProps) {
  return (
    <article id={`component-${component.id}`} className="scroll-mt-[125px]">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${component.name}`}
        className="group w-full min-w-0 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-3"
      >
        <div className="relative flex h-[165px] items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-blue-200 group-hover:bg-blue-50/40 group-hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:group-hover:border-blue-800 dark:group-hover:bg-blue-950/20">
          <div className="flex h-full w-full scale-[0.9] items-center justify-center">
            {component.preview}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-blue-300 transition-transform duration-200 group-hover:scale-x-100" />

          {component.javascript && (
            <span className="pointer-events-none absolute right-3 top-3 rounded-md border border-blue-100 bg-blue-50 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
              Interactive
            </span>
          )}
        </div>

        <div className="mt-2.5">
          <h3 className="truncate text-[12px] font-medium text-zinc-950 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300">
            {component.name}
          </h3>

          <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-zinc-400">
            {component.description}
          </p>
        </div>
      </button>
    </article>
  );
}

export default ComponentCard;
