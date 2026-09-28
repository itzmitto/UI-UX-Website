import {
  Bell,
  Check,
  CheckCircle2,
  File,
  FileText,
  Image,
  Inbox,
  Mail,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import {
  type DragEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

export function LiquidCursorButtonPreview() {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="flex min-h-52 items-center justify-center">
      <button
        type="button"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPosition({
            x: 50,
            y: 50,
          });
        }}
        className="relative isolate overflow-hidden rounded-2xl border border-zinc-300 bg-white px-8 py-4 text-sm font-semibold text-zinc-950 shadow-sm transition hover:border-zinc-950"
      >
        <span
          className="absolute -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-950 transition-transform duration-500 ease-out"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `
              translate(-50%, -50%)
              scale(${hovered ? 1 : 0})
            `,
          }}
        />

        <span
          className={`transition-colors duration-300 ${
            hovered ? "text-white" : "text-zinc-950"
          }`}
        >
          Explore component
        </span>
      </button>
    </div>
  );
}

type TrailPoint = {
  id: number;
  x: number;
  y: number;
};

export function CursorTrailCardPreview() {
  const [points, setPoints] = useState<TrailPoint[]>([]);
  const counter = useRef(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const point = {
      id: counter.current++,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setPoints((current) => [...current.slice(-8), point]);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPoints([])}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-7 text-white"
    >
      {points.map((point, index) => {
        const opacity = (index + 1) / points.length;

        const size = 20 + index * 4;

        return (
          <span
            key={point.id}
            className="pointer-events-none absolute rounded-full bg-violet-500 blur-md transition-opacity"
            style={{
              width: size,
              height: size,
              left: point.x,
              top: point.y,
              opacity: opacity * 0.35,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}

      <div className="relative">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
          Mouse interaction
        </span>

        <h3 className="mt-3 text-2xl font-semibold">Cursor trail</h3>

        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
          Move the cursor across the card to create a smooth glowing trail.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-2">
          <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
          <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
          <div className="h-16 rounded-xl border border-white/10 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

type UploadFile = {
  id: number;
  name: string;
  progress: number;
  type: string;
};

export function AdvancedFileUploadPreview() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);

  const addFakeFile = (name = "interface-design.png", type = "image") => {
    const id = Date.now();

    setFiles((current) => [
      ...current,
      {
        id,
        name,
        progress: 0,
        type,
      },
    ]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const dropped = Array.from(event.dataTransfer.files);

    if (!dropped.length) {
      return;
    }

    setFiles((current) => [
      ...current,
      ...dropped.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        progress: 0,
        type: file.type || "file",
      })),
    ]);
  };

  useEffect(() => {
    if (!files.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setFiles((current) =>
        current.map((file) => ({
          ...file,
          progress:
            file.progress >= 100 ? 100 : Math.min(100, file.progress + 8),
        })),
      );
    }, 180);

    return () => window.clearInterval(interval);
  }, [files.length]);

  return (
    <div className="w-full max-w-lg">
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragging
            ? "scale-[1.02] border-violet-500 bg-violet-50"
            : "border-zinc-300 bg-zinc-50"
        }`}
      >
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition ${
            dragging
              ? "bg-violet-600 text-white"
              : "bg-white text-zinc-500 shadow-sm"
          }`}
        >
          <UploadCloud size={23} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-zinc-950">
          Drop files here
        </h3>

        <p className="mt-2 text-xs text-zinc-500">
          PNG, JPG, SVG or PDF up to 10MB
        </p>

        <button
          type="button"
          onClick={() => addFakeFile()}
          className="mt-5 rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Browse files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="rounded-xl border border-zinc-200 bg-white p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                  {file.type.includes("image") ? (
                    <Image size={16} />
                  ) : (
                    <File size={16} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-zinc-800">
                      {file.name}
                    </p>

                    <span className="text-xs text-zinc-400">
                      {file.progress}%
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${
                        file.progress === 100 ? "bg-emerald-500" : "bg-zinc-950"
                      }`}
                      style={{
                        width: `${file.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setFiles((current) =>
                      current.filter((item) => item.id !== file.id),
                    )
                  }
                  className="text-zinc-400 transition hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const tabItems = [
  {
    name: "Overview",
    content: "General account information and activity.",
  },
  {
    name: "Analytics",
    content: "Traffic, conversions and performance metrics.",
  },
  {
    name: "Settings",
    content: "Manage preferences and configuration.",
  },
];

export function AnimatedTabsPreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="relative grid grid-cols-3 rounded-xl bg-zinc-100 p-1">
        <div
          className="absolute bottom-1 top-1 rounded-lg bg-white shadow-sm transition-transform duration-300 ease-out"
          style={{
            width: "calc((100% - 8px) / 3)",
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {tabItems.map((tab, index) => (
          <button
            key={tab.name}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`relative z-10 rounded-lg px-3 py-2 text-xs font-medium transition ${
              activeIndex === index ? "text-zinc-950" : "text-zinc-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div
        key={activeIndex}
        className="animate-[fadeIn_250ms_ease-out] px-2 py-8"
      >
        <h3 className="text-lg font-semibold text-zinc-950">
          {tabItems[activeIndex].name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {tabItems[activeIndex].content}
        </p>
      </div>
    </div>
  );
}

type Notification = {
  id: number;
  title: string;
  text: string;
  unread: boolean;
  icon: "mail" | "file";
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New message",
    text: "Alex sent you a message.",
    unread: true,
    icon: "mail",
  },
  {
    id: 2,
    title: "Design updated",
    text: "Dashboard.fig was updated.",
    unread: true,
    icon: "file",
  },
  {
    id: 3,
    title: "Welcome",
    text: "Your workspace is ready.",
    unread: false,
    icon: "mail",
  },
];

export function NotificationCenterPreview() {
  const [open, setOpen] = useState(true);

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((item) => item.unread).length;

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        unread: false,
      })),
    );
  };

  return (
    <div className="relative flex min-h-80 w-full items-start justify-center pt-8">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm"
      >
        <Bell size={18} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-20 w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                Notifications
              </h3>

              <p className="text-[11px] text-zinc-400">{unreadCount} unread</p>
            </div>

            <button
              type="button"
              onClick={markAllRead}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-950"
            >
              Mark all read
            </button>
          </div>

          <div className="max-h-64 overflow-auto p-2">
            {notifications.map((notification) => {
              const Icon = notification.icon === "mail" ? Mail : FileText;

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    setNotifications((current) =>
                      current.map((item) =>
                        item.id === notification.id
                          ? {
                              ...item,
                              unread: false,
                            }
                          : item,
                      ),
                    )
                  }
                  className={`flex w-full gap-3 rounded-xl p-3 text-left transition ${
                    notification.unread
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-zinc-50"
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-500 shadow-sm">
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-zinc-900">
                        {notification.title}
                      </p>

                      {notification.unread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      )}
                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                      {notification.text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const timelineItems = [
  {
    title: "Project created",
    description: "Initial workspace and repository created.",
  },
  {
    title: "Design completed",
    description: "Core UI designs approved.",
  },
  {
    title: "Development",
    description: "Frontend implementation in progress.",
  },
  {
    title: "Launch",
    description: "Production deployment.",
  },
];

export function InteractiveTimelinePreview() {
  const [active, setActive] = useState(2);

  return (
    <div className="w-full max-w-lg">
      {timelineItems.map((item, index) => {
        const completed = index < active;

        const current = index === active;

        return (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(index)}
            className="group flex w-full gap-4 text-left"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition ${
                  completed
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : current
                      ? "border-zinc-950 bg-zinc-950 text-white"
                      : "border-zinc-300 bg-white text-zinc-400 group-hover:border-zinc-500"
                }`}
              >
                {completed ? (
                  <Check size={14} />
                ) : (
                  <span className="text-[11px] font-semibold">{index + 1}</span>
                )}
              </div>

              {index < timelineItems.length - 1 && (
                <div
                  className={`h-14 w-0.5 transition ${
                    completed ? "bg-emerald-500" : "bg-zinc-200"
                  }`}
                />
              )}
            </div>

            <div className="pb-6">
              <p
                className={`text-sm font-semibold transition ${
                  current ? "text-zinc-950" : "text-zinc-600"
                }`}
              >
                {item.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-500">
                {item.description}
              </p>

              {current && (
                <span className="mt-2 inline-flex rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-medium text-zinc-600">
                  Current step
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
