import { Moon, Search } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-zinc-950"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-sm font-bold text-white">
              UI
            </div>

            <span>UIUX</span>

            <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-500">
              v1.0
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a
              href="/"
              className="text-zinc-500 transition hover:text-zinc-950"
            >
              Getting Started
            </a>

            <a
              href="/components"
              className="font-medium text-zinc-950"
            >
              Components
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden h-9 w-64 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-left text-sm text-zinc-400 transition hover:bg-zinc-100 lg:flex"
          >
            <Search size={16} />

            <span className="flex-1">
              Search components...
            </span>

            <span className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] text-zinc-400">
              Ctrl K
            </span>
          </button>

          <button
            type="button"
            aria-label="Change theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100"
          >
            <Moon size={17} />
          </button>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100"
          >
            <FaGithub size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;