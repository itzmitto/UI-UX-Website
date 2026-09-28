import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useComponentLibrary } from "../../context/ComponentLibraryContext";
import { useTheme } from "../../context/ThemeContext";
import { components } from "../../data/components";

type HeaderProps = {
  onOpenMenu: () => void;
};

function Header({ onOpenMenu }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { openComponent } = useComponentLibrary();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return components.slice(0, 6);
    }

    return components
      .filter((component) => {
        return (
          component.name.toLowerCase().includes(value) ||
          component.category.toLowerCase().includes(value) ||
          component.description.toLowerCase().includes(value)
        );
      })
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery("");
  };

  const selectResult = (component: (typeof components)[number]) => {
    closeSearch();
    openComponent(component);
  };

  const navClass = (path: string) => {
    const active =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);

    return `relative flex h-full items-center text-[13px] font-medium transition ${
      active
        ? "text-zinc-950 dark:text-white"
        : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
    }`;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] border-b border-zinc-200 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex h-[58px] max-w-[1240px] items-center gap-4 px-5">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 lg:hidden dark:hover:bg-zinc-800"
          >
            <Menu size={18} />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-300 text-[11px] font-black text-zinc-950">
              UI
            </div>

            <span className="text-[15px] font-bold tracking-tight text-zinc-950 dark:text-white">
              UIUX
            </span>

            <span className="hidden text-[10px] text-zinc-400 sm:block">
              v1.0
            </span>
          </Link>

          <div className="flex flex-1 justify-center">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-10 w-full max-w-[310px] items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 text-[13px] text-zinc-400 transition hover:border-blue-300 hover:bg-white md:flex dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-500"
            >
              <span className="flex items-center gap-2">
                <Search size={15} />
                Search
              </span>

              <span className="rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[9px] text-zinc-400 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                Ctrl K
              </span>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-blue-50 hover:text-blue-600 md:hidden dark:hover:bg-zinc-800"
            >
              <Search size={16} />
            </button>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-300"
            >
              <FaGithub size={16} />
            </a>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-800 dark:hover:text-blue-300"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-900">
          <div className="mx-auto flex h-[42px] max-w-[1240px] items-center gap-6 px-5">
            <Link to="/docs/introduction" className={navClass("/docs")}>
              Getting Started
            </Link>

            <Link to="/" className={navClass("/")}>
              Components
              {location.pathname === "/" && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-300" />
              )}
            </Link>

            <span className="hidden text-[13px] text-zinc-400 sm:block">
              Releases
            </span>

            <span className="hidden text-[13px] text-zinc-400 sm:block">
              Migration
            </span>

            <span className="ml-auto rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
              Web
            </span>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/30 p-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeSearch();
            }
          }}
        >
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-14 items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
              <Search size={17} className="text-blue-400" />

              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search components..."
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white"
              />

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[420px] overflow-auto p-2">
              {results.length > 0 ? (
                results.map((component) => (
                  <button
                    key={component.id}
                    type="button"
                    onClick={() => selectResult(component)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-blue-50 dark:hover:bg-zinc-900"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-950 dark:text-white">
                        {component.name}
                      </p>

                      <p className="mt-0.5 text-xs text-zinc-400">
                        {component.category}
                      </p>
                    </div>

                    <span className="text-[10px] font-medium text-blue-500">
                      Open
                    </span>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center text-sm text-zinc-400">
                  No components found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
