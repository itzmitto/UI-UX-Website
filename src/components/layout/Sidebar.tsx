import { X } from "lucide-react";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { categories } from "../../data/components";

type SidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const location = useLocation();

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen, onClose]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-2.5 py-1.5 text-[12px] transition ${
      isActive
        ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
        : "text-zinc-500 hover:bg-blue-50/70 hover:text-blue-700 dark:text-zinc-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
    }`;

  const onNavigate = () => {
    onClose();
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-[79] bg-black/30 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-[80] w-[270px] overflow-y-auto border-r border-zinc-200 bg-white px-4 pb-8 pt-4 transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-[100px] lg:z-auto lg:block lg:h-[calc(100vh-100px)] lg:w-auto lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:px-0 lg:pb-10 lg:pt-7 dark:lg:bg-transparent ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-zinc-950 dark:text-white">
            Navigation
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
          >
            <X size={17} />
          </button>
        </div>

        <nav>
          <p className="mb-1 px-2.5 text-[11px] font-semibold text-zinc-950 dark:text-white">
            Overview
          </p>

          <NavLink to="/" end onClick={onNavigate} className={linkClass}>
            All Components (React)
          </NavLink>

          <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-900" />

          <p className="mb-1 px-2.5 text-[11px] font-semibold text-zinc-950 dark:text-white">
            Components
          </p>

          <div className="space-y-0.5">
            {categories.map((category) => (
              <NavLink
                key={category.slug}
                to={`/components/${category.slug}`}
                onClick={onNavigate}
                className={linkClass}
              >
                {category.name}
              </NavLink>
            ))}
          </div>

          <div className="my-4 h-px bg-zinc-100 dark:bg-zinc-900" />

          <p className="mb-1 px-2.5 text-[11px] font-semibold text-zinc-950 dark:text-white">
            Getting Started
          </p>

          <NavLink
            to="/docs/introduction"
            onClick={onNavigate}
            className={linkClass}
          >
            Introduction
          </NavLink>

          <NavLink
            to="/docs/installation"
            onClick={onNavigate}
            className={linkClass}
          >
            Installation
          </NavLink>
        </nav>

        <div className="mt-6 hidden lg:block">
          <p className="px-2.5 text-[11px] leading-5 text-zinc-400">
            {location.pathname === "/"
              ? "Browse all available UI components."
              : "Component documentation"}
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
