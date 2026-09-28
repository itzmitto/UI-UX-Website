import {
  AdvancedFileUploadPreview,
  AnimatedTabsPreview,
  CursorTrailCardPreview,
  InteractiveTimelinePreview,
  LiquidCursorButtonPreview,
  NotificationCenterPreview,
} from "../components/previews/AdvancedInteractionsPreviews";
import type { UIComponent } from "../types/component";

export const advancedInteractions: UIComponent[] = [
  {
    id: "liquid-cursor-button",
    name: "Liquid Cursor Button",
    description:
      "Premium button with a cursor-positioned liquid fill animation.",
    category: "Buttons",
    preview: <LiquidCursorButtonPreview />,
    typescript: `import {
  type MouseEvent,
  useState,
} from "react";

function LiquidCursorButton() {
  const [position, setPosition] =
    useState({ x: 50, y: 50 });

  const [hovered, setHovered] =
    useState(false);

  const handleMove = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    setPosition({
      x:
        ((event.clientX - rect.left) /
          rect.width) *
        100,
      y:
        ((event.clientY - rect.top) /
          rect.height) *
        100,
    });
  };

  return (
    <button
      onMouseMove={handleMove}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
      className="relative overflow-hidden rounded-2xl border px-8 py-4"
    >
      <span
        className="absolute h-40 w-40 rounded-full bg-zinc-950"
        style={{
          left: \`\${position.x}%\`,
          top: \`\${position.y}%\`,
          transform: \`
            translate(-50%, -50%)
            scale(\${hovered ? 1 : 0})
          \`,
        }}
      />

      <span className="relative">
        Explore component
      </span>
    </button>
  );
}

export default LiquidCursorButton;`,
    tailwind: `relative
isolate
overflow-hidden
rounded-2xl
border
border-zinc-300
bg-white
px-8
py-4
text-sm
font-semibold
shadow-sm`,
    javascript: `function getCursorPosition(
  clientX,
  clientY,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  return {
    x:
      ((clientX - rect.left) /
        rect.width) *
      100,
    y:
      ((clientY - rect.top) /
        rect.height) *
      100,
  };
}`,
  },

  {
    id: "cursor-trail-card",
    name: "Cursor Trail Card",
    description:
      "Dark showcase card that generates a glowing trail behind the cursor.",
    category: "Cards",
    preview: <CursorTrailCardPreview />,
    typescript: `import {
  type MouseEvent,
  useRef,
  useState,
} from "react";

function CursorTrailCard() {
  const [points, setPoints] =
    useState([]);

  const counter = useRef(0);

  const handleMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const point = {
      id: counter.current++,
      x:
        event.clientX -
        rect.left,
      y:
        event.clientY -
        rect.top,
    };

    setPoints((current) => [
      ...current.slice(-8),
      point,
    ]);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setPoints([])
      }
      className="relative overflow-hidden rounded-3xl bg-zinc-950 p-7"
    >
      {points.map((point) => (
        <span
          key={point.id}
          className="absolute rounded-full bg-violet-500 blur-md"
          style={{
            left: point.x,
            top: point.y,
          }}
        />
      ))}
    </div>
  );
}

export default CursorTrailCard;`,
    tailwind: `relative
overflow-hidden
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-7
text-white`,
    javascript: `const maxTrailPoints = 9;

function addTrailPoint(
  points,
  point,
) {
  return [
    ...points.slice(
      -(maxTrailPoints - 1),
    ),
    point,
  ];
}

function calculateTrailPoint(
  clientX,
  clientY,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}`,
  },

  {
    id: "advanced-file-upload",
    name: "Advanced File Upload",
    description:
      "Drag-and-drop file uploader with animated progress and removable files.",
    category: "Forms",
    preview: <AdvancedFileUploadPreview />,
    typescript: `import {
  type DragEvent,
  useEffect,
  useState,
} from "react";

function FileUpload() {
  const [dragging, setDragging] =
    useState(false);

  const [files, setFiles] =
    useState([]);

  const handleDrop = (
    event: DragEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    setDragging(false);

    const dropped =
      Array.from(
        event.dataTransfer.files,
      );

    setFiles(dropped);
  };

  return (
    <div
      onDragOver={(event) =>
        event.preventDefault()
      }
      onDragEnter={() =>
        setDragging(true)
      }
      onDragLeave={() =>
        setDragging(false)
      }
      onDrop={handleDrop}
      className={
        dragging
          ? "border-violet-500"
          : "border-zinc-300"
      }
    >
      Drop files here
    </div>
  );
}

export default FileUpload;`,
    tailwind: `rounded-3xl
border-2
border-dashed
px-6
py-10
text-center
transition

scale-[1.02]
border-violet-500
bg-violet-50`,
    javascript: `function validateFile(
  file,
  maxSize = 10 * 1024 * 1024,
) {
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "File is too large.",
    };
  }

  return {
    valid: true,
    message: null,
  };
}

function updateProgress(
  current,
  amount = 8,
) {
  return Math.min(
    100,
    current + amount,
  );
}`,
  },

  {
    id: "animated-sliding-tabs",
    name: "Animated Sliding Tabs",
    description:
      "Tabs with an animated sliding selection indicator and content transitions.",
    category: "Navigation",
    preview: <AnimatedTabsPreview />,
    typescript: `import {
  useState,
} from "react";

function AnimatedTabs() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const tabs = [
    "Overview",
    "Analytics",
    "Settings",
  ];

  return (
    <div className="relative grid grid-cols-3 rounded-xl bg-zinc-100 p-1">
      <div
        className="absolute bottom-1 top-1 rounded-lg bg-white shadow-sm transition-transform"
        style={{
          width:
            "calc((100% - 8px) / 3)",
          transform: \`translateX(\${activeIndex * 100}%)\`,
        }}
      />

      {tabs.map((tab, index) => (
        <button
          key={tab}
          onClick={() =>
            setActiveIndex(index)
          }
          className="relative z-10 px-3 py-2"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default AnimatedTabs;`,
    tailwind: `relative
grid
grid-cols-3
rounded-xl
bg-zinc-100
p-1

absolute
bottom-1
top-1
rounded-lg
bg-white
shadow-sm
transition-transform
duration-300
ease-out`,
    javascript: `function getTabTransform(
  activeIndex,
) {
  return \`translateX(\${
    activeIndex * 100
  }%)\`;
}

function nextTab(
  current,
  total,
) {
  return (
    (current + 1) %
    total
  );
}`,
  },

  {
    id: "notification-center",
    name: "Notification Center",
    description:
      "Interactive notification popover with unread states and mark-all-read behavior.",
    category: "Overlays",
    preview: <NotificationCenterPreview />,
    typescript: `import {
  Bell,
} from "lucide-react";
import {
  useState,
} from "react";

function NotificationCenter() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const unread =
    notifications.filter(
      (item) => item.unread,
    ).length;

  const markAllRead = () => {
    setNotifications(
      notifications.map(
        (item) => ({
          ...item,
          unread: false,
        }),
      ),
    );
  };

  return (
    <div>
      <button>
        <Bell />
        {unread}
      </button>

      <button onClick={markAllRead}>
        Mark all read
      </button>
    </div>
  );
}

export default NotificationCenter;`,
    tailwind: `rounded-2xl
border
border-zinc-200
bg-white
shadow-2xl

max-h-64
overflow-auto
p-2`,
    javascript: `function getUnreadCount(
  notifications,
) {
  return notifications.filter(
    (notification) =>
      notification.unread,
  ).length;
}

function markAllAsRead(
  notifications,
) {
  return notifications.map(
    (notification) => ({
      ...notification,
      unread: false,
    }),
  );
}

function markOneAsRead(
  notifications,
  id,
) {
  return notifications.map(
    (notification) =>
      notification.id === id
        ? {
            ...notification,
            unread: false,
          }
        : notification,
  );
}`,
  },

  {
    id: "interactive-timeline",
    name: "Interactive Timeline",
    description:
      "Clickable progress timeline with completed, current and upcoming states.",
    category: "Timelines",
    preview: <InteractiveTimelinePreview />,
    typescript: `import {
  Check,
} from "lucide-react";
import {
  useState,
} from "react";

function Timeline() {
  const [active, setActive] =
    useState(2);

  const steps = [
    "Project created",
    "Design completed",
    "Development",
    "Launch",
  ];

  return (
    <div>
      {steps.map(
        (step, index) => {
          const completed =
            index < active;

          const current =
            index === active;

          return (
            <button
              key={step}
              onClick={() =>
                setActive(index)
              }
            >
              {completed ? (
                <Check />
              ) : (
                index + 1
              )}

              {step}

              {current &&
                "Current"}
            </button>
          );
        },
      )}
    </div>
  );
}

export default Timeline;`,
    tailwind: `flex
w-full
gap-4
text-left

h-8
w-8
rounded-full
border-2
transition

border-emerald-500
bg-emerald-500
text-white`,
    javascript: `function getStepState(
  index,
  activeIndex,
) {
  if (index < activeIndex) {
    return "completed";
  }

  if (index === activeIndex) {
    return "current";
  }

  return "upcoming";
}

function setTimelineStep(
  index,
  totalSteps,
) {
  return Math.max(
    0,
    Math.min(
      index,
      totalSteps - 1,
    ),
  );
}`,
  },
];
