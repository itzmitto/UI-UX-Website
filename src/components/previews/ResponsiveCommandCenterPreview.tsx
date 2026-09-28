import {
  Bell,
  Check,
  FileText,
  Home,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type DockId = "home" | "workspace" | "messages" | "notifications" | "profile";

type CommandItem = {
  id: string;
  label: string;
  description: string;
  icon: typeof Search;
  shortcut?: string;
  target?: DockId;
};

const dockItems = [
  {
    id: "home" as const,
    label: "Home",
    icon: Home,
  },
  {
    id: "workspace" as const,
    label: "Workspace",
    icon: LayoutGrid,
  },
  {
    id: "messages" as const,
    label: "Messages",
    icon: MessageSquare,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "profile" as const,
    label: "Profile",
    icon: User,
  },
];

const commands: CommandItem[] = [
  {
    id: "create-page",
    label: "Create new page",
    description: "Start a new workspace page",
    icon: FileText,
    shortcut: "N",
    target: "workspace",
  },
  {
    id: "open-messages",
    label: "Open messages",
    description: "View recent conversations",
    icon: MessageSquare,
    shortcut: "M",
    target: "messages",
  },
  {
    id: "notifications",
    label: "View notifications",
    description: "Check recent activity",
    icon: Bell,
    shortcut: "B",
    target: "notifications",
  },
  {
    id: "profile",
    label: "Open profile",
    description: "Manage your profile",
    icon: User,
    target: "profile",
  },
  {
    id: "settings",
    label: "Workspace settings",
    description: "Configure the workspace",
    icon: Settings,
  },
];

const quickActions = [
  {
    id: "page",
    label: "New page",
    icon: FileText,
  },
  {
    id: "message",
    label: "Message",
    icon: MessageSquare,
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: LayoutGrid,
  },
];

function ResponsiveCommandCenterPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [compact, setCompact] = useState(false);

  const [activeDock, setActiveDock] = useState<DockId>("home");

  const [paletteOpen, setPaletteOpen] = useState(false);

  const [quickOpen, setQuickOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [notifications, setNotifications] = useState(3);

  const [completedAction, setCompletedAction] = useState<string | null>(null);

  const [hoveredDock, setHoveredDock] = useState<DockId | null>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 520);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const filteredCommands = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return commands;
    }

    return commands.filter(
      (command) =>
        command.label.toLowerCase().includes(value) ||
        command.description.toLowerCase().includes(value),
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const openPalette = () => {
    setQuickOpen(false);
    setPaletteOpen(true);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  };

  const closePalette = () => {
    setPaletteOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const executeCommand = (command: CommandItem) => {
    if (command.target) {
      setActiveDock(command.target);

      if (command.target === "notifications") {
        setNotifications(0);
      }
    }

    setCompletedAction(command.label);

    closePalette();

    window.setTimeout(() => {
      setCompletedAction(null);
    }, 1600);
  };

  const executeQuickAction = (id: string, label: string) => {
    setCompletedAction(label);
    setQuickOpen(false);

    if (id === "workspace") {
      setActiveDock("workspace");
    }

    if (id === "message") {
      setActiveDock("messages");
    }

    window.setTimeout(() => {
      setCompletedAction(null);
    }, 1600);
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        if (paletteOpen) {
          closePalette();
        } else {
          openPalette();
        }

        return;
      }

      if (event.key === "Escape") {
        if (paletteOpen) {
          closePalette();
        }

        setQuickOpen(false);

        return;
      }

      if (!paletteOpen) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setSelectedIndex((current) =>
          Math.min(current + 1, filteredCommands.length - 1),
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setSelectedIndex((current) => Math.max(current - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();

        const command = filteredCommands[selectedIndex];

        if (command) {
          executeCommand(command);
        }
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [paletteOpen, selectedIndex, filteredCommands]);

  const selectDock = (id: DockId) => {
    setActiveDock(id);
    setQuickOpen(false);

    if (id === "notifications") {
      setNotifications(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[460px] w-full overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-zinc-50 shadow-sm"
    >
      <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-blue-200/35 blur-3xl" />

      <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-blue-300/25 blur-3xl" />

      <div className="relative z-10 flex min-h-[460px] flex-col">
        <header className="flex items-center justify-between border-b border-blue-100/70 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-300 text-zinc-950 shadow-sm">
              <Sparkles size={16} />
            </div>

            <div>
              <p className="text-sm font-semibold text-zinc-950">Command</p>

              <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-blue-500">
                Responsive center
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={openPalette}
            className="flex h-9 items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-3 text-[10px] font-medium text-zinc-500 shadow-sm backdrop-blur transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Search size={13} />

            {!compact && (
              <>
                Search
                <span className="rounded-md border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[8px] text-zinc-400">
                  ⌘ K
                </span>
              </>
            )}
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center p-5 pb-24">
          <div className="w-full max-w-[420px]">
            <div className="rounded-3xl border border-blue-100 bg-white/80 p-5 shadow-[0_20px_50px_rgba(59,130,246,0.08)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                    Current view
                  </p>

                  <h3 className="mt-1 text-lg font-semibold capitalize tracking-tight text-zinc-950">
                    {activeDock}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  {activeDock === "home" && <Home size={17} />}

                  {activeDock === "workspace" && <LayoutGrid size={17} />}

                  {activeDock === "messages" && <MessageSquare size={17} />}

                  {activeDock === "notifications" && <Bell size={17} />}

                  {activeDock === "profile" && <User size={17} />}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  {
                    label: "Projects",
                    value: "12",
                  },
                  {
                    label: "Messages",
                    value: "24",
                  },
                  {
                    label: "Activity",
                    value: "86%",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-3"
                  >
                    <p className="text-sm font-semibold text-zinc-950">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-[9px] text-zinc-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60">
                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-300 text-zinc-950">
                    <Sparkles size={16} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-zinc-900">
                      Smart workspace
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-zinc-500">
                      Your most used tools are ready.
                    </p>
                  </div>

                  <div className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
                </div>

                <div className="h-1 bg-blue-100">
                  <div className="h-full w-[72%] rounded-r-full bg-blue-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {completedAction && (
          <div className="absolute bottom-[88px] left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-emerald-100 bg-white px-3 py-2 text-[10px] font-medium text-emerald-700 shadow-lg">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
              <Check size={11} />
            </span>

            {completedAction}
          </div>
        )}

        {quickOpen && (
          <div
            className={`absolute z-30 border border-blue-100 bg-white/95 shadow-2xl backdrop-blur-xl ${
              compact
                ? "bottom-[76px] left-3 right-3 rounded-2xl p-3"
                : "bottom-[92px] left-1/2 w-[270px] -translate-x-1/2 rounded-2xl p-3"
            }`}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <div>
                <p className="text-[10px] font-semibold text-zinc-900">
                  Quick create
                </p>

                <p className="mt-0.5 text-[8px] text-zinc-400">
                  Choose an action
                </p>
              </div>

              <button
                type="button"
                onClick={() => setQuickOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
              >
                <X size={13} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {quickActions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => executeQuickAction(id, label)}
                  className="group flex flex-col items-center rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm transition group-hover:bg-blue-300 group-hover:text-zinc-950">
                    <Icon size={14} />
                  </span>

                  <span className="mt-2 text-[8px] font-medium text-zinc-600">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className={`absolute bottom-4 left-1/2 z-20 -translate-x-1/2 ${
            compact ? "w-[calc(100%-24px)]" : "w-auto"
          }`}
        >
          <div
            className={`flex items-end border border-blue-100 bg-white/90 p-1.5 shadow-[0_18px_45px_rgba(59,130,246,0.18)] backdrop-blur-xl ${
              compact
                ? "w-full justify-between rounded-2xl"
                : "gap-1 rounded-2xl"
            }`}
          >
            {dockItems.map(({ id, label, icon: Icon }) => {
              const active = activeDock === id;

              const hovered = hoveredDock === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectDock(id)}
                  onPointerEnter={() => setHoveredDock(id)}
                  onPointerLeave={() => setHoveredDock(null)}
                  aria-label={label}
                  className={`group relative flex items-center justify-center rounded-xl transition-all duration-200 ${
                    compact ? "h-11 flex-1" : "h-11 w-11"
                  } ${
                    active
                      ? "bg-blue-300 text-zinc-950"
                      : "text-zinc-400 hover:bg-blue-50 hover:text-blue-600"
                  } ${hovered && !compact ? "-translate-y-1 scale-110" : ""}`}
                >
                  <Icon size={16} />

                  {id === "notifications" && notifications > 0 && (
                    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-blue-500 px-0.5 text-[7px] font-bold text-white">
                      {notifications}
                    </span>
                  )}

                  {!compact && hovered && (
                    <span className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap rounded-lg bg-zinc-950 px-2 py-1 text-[8px] font-medium text-white shadow-lg">
                      {label}
                    </span>
                  )}

                  {active && (
                    <span className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-blue-700" />
                  )}
                </button>
              );
            })}

            <div className="mx-0.5 h-7 w-px bg-zinc-200" />

            <button
              type="button"
              onClick={() => setQuickOpen((current) => !current)}
              aria-label="Quick create"
              className={`flex h-11 items-center justify-center rounded-xl bg-blue-300 text-zinc-950 shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-blue-400 ${
                compact ? "flex-1" : "w-11"
              }`}
            >
              <Plus
                size={17}
                className={`transition-transform duration-200 ${
                  quickOpen ? "rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {paletteOpen && (
          <div
            className={`absolute inset-0 z-50 flex bg-zinc-950/25 p-3 backdrop-blur-[2px] ${
              compact ? "items-end" : "items-center justify-center"
            }`}
            onPointerDown={(event) => {
              if (event.target === event.currentTarget) {
                closePalette();
              }
            }}
          >
            <div
              className={`overflow-hidden border border-blue-100 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.20)] ${
                compact
                  ? "w-full rounded-[24px]"
                  : "w-full max-w-[410px] rounded-[24px]"
              }`}
            >
              <div className="flex h-13 items-center gap-3 border-b border-zinc-100 px-4 py-3">
                <Search size={16} className="shrink-0 text-blue-500" />

                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search commands..."
                  className="min-w-0 flex-1 bg-transparent text-xs text-zinc-950 outline-none placeholder:text-zinc-400"
                />

                <button
                  type="button"
                  onClick={closePalette}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="max-h-[260px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((command, index) => {
                    const Icon = command.icon;

                    const selected = selectedIndex === index;

                    return (
                      <button
                        key={command.id}
                        type="button"
                        onPointerEnter={() => setSelectedIndex(index)}
                        onClick={() => executeCommand(command)}
                        className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${
                          selected ? "bg-blue-50" : "hover:bg-zinc-50"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                            selected
                              ? "bg-blue-300 text-zinc-950"
                              : "bg-zinc-100 text-zinc-500"
                          }`}
                        >
                          <Icon size={14} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[11px] font-medium text-zinc-900">
                            {command.label}
                          </span>

                          <span className="mt-0.5 block truncate text-[9px] text-zinc-400">
                            {command.description}
                          </span>
                        </span>

                        {command.shortcut && (
                          <span className="rounded-md border border-zinc-200 bg-white px-1.5 py-1 font-mono text-[8px] text-zinc-400">
                            {command.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-10 text-center">
                    <Search size={20} className="mx-auto text-zinc-300" />

                    <p className="mt-2 text-[10px] text-zinc-400">
                      No commands found
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 border-t border-zinc-100 bg-zinc-50/70 px-4 py-2 text-[8px] text-zinc-400">
                <span>↑↓ Navigate</span>

                <span>↵ Select</span>

                <span>ESC Close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsiveCommandCenterPreview;
