import {
  Bell,
  Code2,
  FileText,
  Folder,
  Home,
  LayoutGrid,
  Menu,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaGithub } from "react-icons/fa";

export function MagneticButtonPreview() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [pressed, setPressed] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.22,
      y: y * 0.22,
    });
  };

  const reset = () => {
    setPosition({
      x: 0,
      y: 0,
    });

    setPressed(false);
  };

  return (
    <div className="flex min-h-48 items-center justify-center">
      <button
        type="button"
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        className="group relative isolate overflow-hidden rounded-2xl bg-zinc-950 px-7 py-3.5 text-sm font-semibold text-white shadow-xl"
        style={{
          transform: `
            translate(
              ${position.x}px,
              ${position.y}px
            )
            scale(${pressed ? 0.96 : 1})
          `,
          transition: pressed
            ? "transform 80ms ease"
            : "transform 180ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <span
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `
              radial-gradient(
                circle at
                ${50 + position.x * 2}%
                ${50 + position.y * 2}%,
                rgba(139,92,246,.9),
                rgba(59,130,246,.5) 35%,
                transparent 70%
              )
            `,
          }}
        />

        <span className="flex items-center gap-2">
          <Sparkles size={16} />
          Explore UI
        </span>
      </button>
    </div>
  );
}

export function TiltCardPreview() {
  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  const [glow, setGlow] = useState({
    x: 50,
    y: 50,
  });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    setTilt({
      x: (0.5 - y) * 12,
      y: (x - 0.5) * 14,
    });

    setGlow({
      x: x * 100,
      y: y * 100,
    });
  };

  const reset = () => {
    setTilt({
      x: 0,
      y: 0,
    });

    setGlow({
      x: 50,
      y: 50,
    });
  };

  return (
    <div
      className="flex min-h-72 items-center justify-center"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl transition-transform duration-200"
        style={{
          transform: `
            rotateX(${tilt.x}deg)
            rotateY(${tilt.y}deg)
          `,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(
                circle at
                ${glow.x}% ${glow.y}%,
                rgba(124,58,237,.35),
                transparent 50%
              )
            `,
          }}
        />

        <div
          className="relative"
          style={{
            transform: "translateZ(45px)",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Sparkles size={20} />
          </div>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-violet-300">
            Premium UI
          </p>

          <h3 className="mt-2 text-2xl font-semibold">Interactive depth</h3>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Move your cursor over the card to control the 3D perspective.
          </p>

          <div className="mt-7 flex items-center justify-between">
            <span className="text-xs text-zinc-500">React + Tailwind</span>

            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpotlightCardPreview() {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [active, setActive] = useState(false);

  return (
    <div
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        setPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => {
        setActive(false);

        setPosition({
          x: 50,
          y: 50,
        });
      }}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-7 text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `
            radial-gradient(
              350px circle at
              ${position.x}% ${position.y}%,
              rgba(99,102,241,.25),
              transparent 45%
            )
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-px rounded-[23px]"
        style={{
          background: `
            radial-gradient(
              250px circle at
              ${position.x}% ${position.y}%,
              rgba(255,255,255,.08),
              transparent 45%
            )
          `,
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Code2 size={19} />
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-400">
            Interactive
          </span>
        </div>

        <h3 className="mt-10 text-xl font-semibold">Cursor spotlight</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          The lighting follows your mouse position across the component.
        </p>
      </div>
    </div>
  );
}

const dockItems = [
  {
    icon: Home,
    label: "Home",
  },
  {
    icon: Search,
    label: "Search",
  },
  {
    icon: LayoutGrid,
    label: "Apps",
  },
  {
    icon: Bell,
    label: "Notifications",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export function AnimatedDockPreview() {
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div className="flex min-h-56 items-center justify-center">
      <div
        onMouseMove={(event) => setMouseX(event.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="flex h-20 items-end gap-2 rounded-2xl border border-zinc-200 bg-white/90 px-3 pb-3 shadow-2xl backdrop-blur-xl"
      >
        {dockItems.map(({ icon: Icon, label }) => (
          <DockItem key={label} mouseX={mouseX} icon={Icon} label={label} />
        ))}
      </div>
    </div>
  );
}

type DockItemProps = {
  mouseX: number | null;
  icon: typeof Home;
  label: string;
};

function DockItem({ mouseX, icon: Icon, label }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const [hovered, setHovered] = useState(false);

  const rect = ref.current?.getBoundingClientRect();

  const center = rect ? rect.left + rect.width / 2 : 0;

  const distance = mouseX === null ? 150 : Math.abs(mouseX - center);

  const influence = Math.max(0, 1 - distance / 120);

  const size = 42 + influence * 22;

  const lift = influence * -12;

  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`pointer-events-none absolute -top-10 whitespace-nowrap rounded-md bg-zinc-950 px-2 py-1 text-[10px] text-white transition ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        {label}
      </div>

      <button
        ref={ref}
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        className="flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 shadow-sm transition-colors hover:bg-zinc-950 hover:text-white"
        style={{
          width: size,
          height: size,
          transform: `translateY(${lift}px)`,
          transition:
            "width 120ms ease, height 120ms ease, transform 120ms ease",
        }}
      >
        <Icon size={17 + influence * 5} />
      </button>
    </div>
  );
}

const commandItems = [
  {
    icon: Home,
    label: "Go to dashboard",
    group: "Navigation",
  },
  {
    icon: Folder,
    label: "Open projects",
    group: "Navigation",
  },
  {
    icon: FileText,
    label: "Create document",
    group: "Actions",
  },
  {
    icon: User,
    label: "View profile",
    group: "Account",
  },
  {
    icon: Settings,
    label: "Open settings",
    group: "Account",
  },
];

export function CommandPalettePreview() {
  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selected, setSelected] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (filtered.length === 0) {
        return;
      }

      setSelected((current) => Math.min(current + 1, filtered.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (filtered.length === 0) {
        return;
      }

      setSelected((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Escape") {
      closePalette();
    }

    if (event.key === "Enter" && filtered[selected]) {
      closePalette();
    }
  };

  return (
    <div className="relative flex min-h-80 w-full items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-500 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
      >
        <Search size={16} />
        Search commands...
        <span className="ml-8 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px]">
          Ctrl K
        </span>
      </button>

      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/25 p-4 backdrop-blur-[2px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-zinc-200 px-4">
              <Search size={17} className="text-zinc-400" />

              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command..."
                className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                onClick={closePalette}
                aria-label="Close command palette"
                className="text-zinc-400 hover:text-zinc-950"
              >
                <X size={17} />
              </button>
            </div>

            <div className="max-h-64 overflow-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onMouseEnter={() => setSelected(index)}
                      onClick={closePalette}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                        selected === index
                          ? "bg-zinc-100 text-zinc-950"
                          : "text-zinc-600"
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                        <Icon size={15} />
                      </div>

                      <div>
                        <p className="text-sm font-medium">{item.label}</p>

                        <p className="text-[11px] text-zinc-400">
                          {item.group}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-10 text-center text-sm text-zinc-400">
                  No commands found
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-zinc-200 px-4 py-2 text-[10px] text-zinc-400">
              <span>↑↓ Navigate</span>

              <span>↵ Select</span>

              <span>Esc Close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function MorphingNavbarPreview() {
  const [expanded, setExpanded] = useState(false);

  const [active, setActive] = useState("Home");

  const items = ["Home", "Components", "Docs"];

  return (
    <div className="flex min-h-64 w-full items-start justify-center pt-10">
      <nav
        className="max-w-full overflow-hidden border border-zinc-200 bg-white shadow-xl"
        style={{
          width: expanded ? 420 : 250,
          maxWidth: "100%",
          borderRadius: expanded ? 24 : 999,
          transition:
            "width 350ms cubic-bezier(.2,.8,.2,1), border-radius 350ms ease",
        }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-xs font-bold text-white">
            UI
          </div>

          {!expanded && (
            <div className="flex min-w-0 items-center gap-1">
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActive(item)}
                  className={`rounded-full px-3 py-1.5 text-xs transition ${
                    active === item
                      ? "bg-zinc-100 font-medium text-zinc-950"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-expanded={expanded}
            aria-label={expanded ? "Close navigation" : "Open navigation"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-100"
          >
            {expanded ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <div
          className="overflow-hidden px-4"
          style={{
            maxHeight: expanded ? 210 : 0,
            opacity: expanded ? 1 : 0,
            paddingBottom: expanded ? 16 : 0,
            transition:
              "max-height 350ms ease, opacity 250ms ease, padding 350ms ease",
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setActive(item);
                  setExpanded(false);
                }}
                className={`rounded-xl p-3 text-left text-sm transition ${
                  active === item
                    ? "bg-zinc-950 text-white"
                    : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {item}
              </button>
            ))}

            <button
              type="button"
              className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-3 text-left text-sm text-white transition hover:brightness-110"
            >
              <span className="flex items-center gap-2">
                <FaGithub size={15} />
                GitHub
              </span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
