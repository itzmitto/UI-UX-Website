import ResponsiveCommandCenterPreview from "../components/previews/ResponsiveCommandCenterPreview";
import type { UIComponent } from "../types/component";

export const commandBars: UIComponent[] = [
  {
    id: "responsive-command-center",
    name: "Responsive Command Center",
    description:
      "Adaptive command dock with ResizeObserver responsiveness, keyboard search, command navigation, notification state, quick actions, compact mode and animated interaction feedback.",
    category: "Command Bars",

    preview: <ResponsiveCommandCenterPreview />,

    typescript: `import {
  Bell,
  FileText,
  Home,
  LayoutGrid,
  MessageSquare,
  Plus,
  Search,
  User,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type DockId =
  | "home"
  | "workspace"
  | "messages"
  | "notifications"
  | "profile";

function CommandCenter() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [compact, setCompact] =
    useState(false);

  const [active, setActive] =
    useState<DockId>("home");

  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    const element =
      containerRef.current;

    if (!element) return;

    const observer =
      new ResizeObserver(
        ([entry]) => {
          setCompact(
            entry.contentRect.width <
              520,
          );
        },
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  const results =
    useMemo(() => {
      return commands.filter(
        (command) =>
          command.label
            .toLowerCase()
            .includes(
              query.toLowerCase(),
            ),
      );
    }, [query]);

  useEffect(() => {
    const keyboard = (
      event: KeyboardEvent,
    ) => {
      if (
        (event.metaKey ||
          event.ctrlKey) &&
        event.key === "k"
      ) {
        event.preventDefault();

        setOpen(
          (current) =>
            !current,
        );
      }

      if (
        event.key === "Escape"
      ) {
        setOpen(false);
      }

      if (
        open &&
        event.key ===
          "ArrowDown"
      ) {
        event.preventDefault();

        setSelectedIndex(
          (current) =>
            Math.min(
              current + 1,
              results.length - 1,
            ),
        );
      }

      if (
        open &&
        event.key === "ArrowUp"
      ) {
        event.preventDefault();

        setSelectedIndex(
          (current) =>
            Math.max(
              current - 1,
              0,
            ),
        );
      }
    };

    window.addEventListener(
      "keydown",
      keyboard,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyboard,
      );
  }, [
    open,
    results.length,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[460px]"
    >
      <nav
        className={
          compact
            ? "w-full"
            : "w-auto"
        }
      >
        <button
          onClick={() =>
            setActive("home")
          }
        >
          <Home />
        </button>

        <button
          onClick={() =>
            setActive(
              "workspace",
            )
          }
        >
          <LayoutGrid />
        </button>

        <button
          onClick={() =>
            setActive(
              "messages",
            )
          }
        >
          <MessageSquare />
        </button>

        <button
          onClick={() =>
            setActive(
              "notifications",
            )
          }
        >
          <Bell />
        </button>

        <button
          onClick={() =>
            setActive(
              "profile",
            )
          }
        >
          <User />
        </button>

        <button>
          <Plus />
        </button>
      </nav>

      {open && (
        <div>
          <Search />

          <input
            ref={inputRef}
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value,
              )
            }
          />

          <button
            onClick={() =>
              setOpen(false)
            }
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
}

export default CommandCenter;`,

    tailwind: `Container:
relative
min-h-[460px]
overflow-hidden
rounded-[30px]
border
border-blue-100
bg-gradient-to-br
from-blue-50
via-white
to-zinc-50

Dock:
border
border-blue-100
bg-white/90
backdrop-blur-xl
shadow-[0_18px_45px_rgba(59,130,246,0.18)]
rounded-2xl

Dock button:
h-11
w-11
rounded-xl
transition-all
duration-200

Active button:
bg-blue-300
text-zinc-950

Hover:
hover:-translate-y-1
hover:scale-110
hover:bg-blue-50
hover:text-blue-600

Quick action:
bg-blue-300
hover:bg-blue-400

Command overlay:
absolute
inset-0
bg-zinc-950/25
backdrop-blur-[2px]

Command palette:
rounded-[24px]
border
border-blue-100
bg-white
shadow-[0_24px_70px_rgba(24,24,27,0.20)]

Selected command:
bg-blue-50

Selected icon:
bg-blue-300
text-zinc-950

Responsive compact dock:
w-full
justify-between

Notification badge:
rounded-full
bg-blue-500
text-white

Success:
border-emerald-100
text-emerald-700`,

    javascript: `const COMPACT_BREAKPOINT = 520;

function createResponsiveObserver(
  element,
  callback,
) {
  const observer =
    new ResizeObserver(
      ([entry]) => {
        callback(
          entry.contentRect.width <
            COMPACT_BREAKPOINT,
        );
      },
    );

  observer.observe(element);

  return () =>
    observer.disconnect();
}

function filterCommands(
  commands,
  query,
) {
  const value =
    query
      .trim()
      .toLowerCase();

  if (!value) {
    return commands;
  }

  return commands.filter(
    (command) =>
      command.label
        .toLowerCase()
        .includes(value) ||
      command.description
        .toLowerCase()
        .includes(value),
  );
}

function moveSelection(
  current,
  direction,
  resultCount,
) {
  if (
    resultCount === 0
  ) {
    return 0;
  }

  if (
    direction === "down"
  ) {
    return Math.min(
      current + 1,
      resultCount - 1,
    );
  }

  return Math.max(
    current - 1,
    0,
  );
}

function createKeyboardController({
  isOpen,
  open,
  close,
  moveUp,
  moveDown,
  select,
}) {
  return function handleKeyDown(
    event,
  ) {
    if (
      (event.metaKey ||
        event.ctrlKey) &&
      event.key.toLowerCase() ===
        "k"
    ) {
      event.preventDefault();

      if (isOpen()) {
        close();
      } else {
        open();
      }

      return;
    }

    if (
      event.key === "Escape"
    ) {
      close();
      return;
    }

    if (!isOpen()) {
      return;
    }

    if (
      event.key ===
      "ArrowDown"
    ) {
      event.preventDefault();
      moveDown();
    }

    if (
      event.key ===
      "ArrowUp"
    ) {
      event.preventDefault();
      moveUp();
    }

    if (
      event.key === "Enter"
    ) {
      event.preventDefault();
      select();
    }
  };
}

function createNotificationState(
  initialCount = 3,
) {
  let count =
    initialCount;

  return {
    getCount() {
      return count;
    },

    clear() {
      count = 0;
      return count;
    },

    add() {
      count += 1;
      return count;
    },
  };
}

function createActionFeedback(
  callback,
  duration = 1600,
) {
  callback(true);

  const timer =
    window.setTimeout(
      () => {
        callback(false);
      },
      duration,
    );

  return () =>
    window.clearTimeout(
      timer,
    );
}`,
  },
];
