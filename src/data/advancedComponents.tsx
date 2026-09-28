import {
  AnimatedDockPreview,
  CommandPalettePreview,
  MagneticButtonPreview,
  MorphingNavbarPreview,
  SpotlightCardPreview,
  TiltCardPreview,
} from "../components/previews/AdvancedShowcasePreviews";
import type { UIComponent } from "../types/component";

export const advancedComponents: UIComponent[] = [
  {
    id: "magnetic-button",
    name: "Magnetic Button",
    description:
      "Interactive button that follows the cursor with magnetic motion and dynamic lighting.",
    category: "Buttons",

    preview: <MagneticButtonPreview />,

    typescript: `import {
  type MouseEvent,
  useState,
} from "react";
import { Sparkles } from "lucide-react";

function MagneticButton() {
  const [position, setPosition] =
    useState({
      x: 0,
      y: 0,
    });

  const [pressed, setPressed] =
    useState(false);

  const handleMouseMove = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    setPosition({
      x: x * 0.22,
      y: y * 0.22,
    });
  };

  return (
    <button
      onMouseMove={handleMouseMove}
      onMouseLeave={() =>
        setPosition({
          x: 0,
          y: 0,
        })
      }
      onMouseDown={() =>
        setPressed(true)
      }
      onMouseUp={() =>
        setPressed(false)
      }
      style={{
        transform: \`
          translate(
            \${position.x}px,
            \${position.y}px
          )
          scale(\${pressed ? 0.96 : 1})
        \`,
      }}
      className="rounded-2xl bg-zinc-950 px-7 py-3.5 font-semibold text-white"
    >
      <span className="flex items-center gap-2">
        <Sparkles size={16} />
        Explore UI
      </span>
    </button>
  );
}

export default MagneticButton;`,

    tailwind: `rounded-2xl
bg-zinc-950
px-7
py-3.5
text-sm
font-semibold
text-white
shadow-xl
transition`,

    javascript: `const magneticStrength = 0.22;

function calculateMagneticPosition(
  mouseX,
  mouseY,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  const x =
    mouseX -
    rect.left -
    rect.width / 2;

  const y =
    mouseY -
    rect.top -
    rect.height / 2;

  return {
    x: x * magneticStrength,
    y: y * magneticStrength,
  };
}

function resetMagneticPosition() {
  return {
    x: 0,
    y: 0,
  };
}`,
  },

  {
    id: "3d-tilt-card",
    name: "3D Tilt Card",
    description:
      "Premium card with cursor-controlled 3D rotation, depth and dynamic glow.",
    category: "Cards",

    preview: <TiltCardPreview />,

    typescript: `import {
  type MouseEvent,
  useState,
} from "react";

function TiltCard() {
  const [tilt, setTilt] =
    useState({
      x: 0,
      y: 0,
    });

  const handleMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    setTilt({
      x: (0.5 - y) * 12,
      y: (x - 0.5) * 14,
    });
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() =>
        setTilt({
          x: 0,
          y: 0,
        })
      }
      style={{
        transform: \`
          rotateX(\${tilt.x}deg)
          rotateY(\${tilt.y}deg)
        \`,
      }}
      className="rounded-3xl bg-zinc-950 p-6 text-white"
    >
      Interactive depth
    </div>
  );
}

export default TiltCard;`,

    tailwind: `rounded-3xl
border
border-white/10
bg-zinc-950
p-6
text-white
shadow-2xl
transition-transform
duration-200`,

    javascript: `function calculateTilt(
  clientX,
  clientY,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  const x =
    (clientX - rect.left) /
    rect.width;

  const y =
    (clientY - rect.top) /
    rect.height;

  return {
    rotateX: (0.5 - y) * 12,
    rotateY: (x - 0.5) * 14,
    glowX: x * 100,
    glowY: y * 100,
  };
}`,
  },

  {
    id: "spotlight-card",
    name: "Spotlight Card",
    description: "Dark card with a spotlight that follows the user's cursor.",
    category: "Cards",

    preview: <SpotlightCardPreview />,

    typescript: `import {
  type MouseEvent,
  useState,
} from "react";

function SpotlightCard() {
  const [position, setPosition] =
    useState({
      x: 50,
      y: 50,
    });

  const handleMove = (
    event: MouseEvent<HTMLDivElement>,
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
    <div
      onMouseMove={handleMove}
      className="relative overflow-hidden rounded-3xl bg-zinc-950 p-7 text-white"
    >
      <div
        className="absolute inset-0"
        style={{
          background: \`
            radial-gradient(
              circle at
              \${position.x}%
              \${position.y}%,
              rgba(99,102,241,.25),
              transparent 45%
            )
          \`,
        }}
      />

      <div className="relative">
        Spotlight Card
      </div>
    </div>
  );
}

export default SpotlightCard;`,

    tailwind: `relative
overflow-hidden
rounded-3xl
border
border-zinc-800
bg-zinc-950
p-7
text-white`,

    javascript: `function calculateSpotlight(
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
    id: "animated-dock",
    name: "Animated Dock",
    description:
      "Mac-style dock with proximity-based icon scaling and animated labels.",
    category: "Navigation",

    preview: <AnimatedDockPreview />,

    typescript: `import {
  Home,
  Search,
  Settings,
} from "lucide-react";
import {
  useRef,
  useState,
} from "react";

function AnimatedDock() {
  const [mouseX, setMouseX] =
    useState<number | null>(null);

  return (
    <div
      onMouseMove={(event) =>
        setMouseX(event.clientX)
      }
      onMouseLeave={() =>
        setMouseX(null)
      }
      className="flex items-end gap-2 rounded-2xl border bg-white p-3"
    >
      <DockItem
        mouseX={mouseX}
        icon={Home}
      />

      <DockItem
        mouseX={mouseX}
        icon={Search}
      />

      <DockItem
        mouseX={mouseX}
        icon={Settings}
      />
    </div>
  );
}

function DockItem({
  mouseX,
  icon: Icon,
}) {
  const ref =
    useRef<HTMLButtonElement>(null);

  const rect =
    ref.current?.getBoundingClientRect();

  const center =
    rect
      ? rect.left +
        rect.width / 2
      : 0;

  const distance =
    mouseX === null
      ? 150
      : Math.abs(
          mouseX - center,
        );

  const influence =
    Math.max(
      0,
      1 - distance / 120,
    );

  const size =
    42 + influence * 22;

  return (
    <button
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      className="rounded-xl bg-zinc-100"
    >
      <Icon />
    </button>
  );
}

export default AnimatedDock;`,

    tailwind: `flex
items-end
gap-2
rounded-2xl
border
border-zinc-200
bg-white/90
px-3
pb-3
shadow-2xl
backdrop-blur-xl`,

    javascript: `function calculateDockInfluence(
  mouseX,
  elementCenter,
) {
  if (mouseX === null) {
    return 0;
  }

  const distance =
    Math.abs(
      mouseX -
      elementCenter,
    );

  return Math.max(
    0,
    1 - distance / 120,
  );
}

function calculateDockSize(
  influence,
) {
  return 42 + influence * 22;
}

function calculateDockLift(
  influence,
) {
  return influence * -12;
}`,
  },

  {
    id: "command-palette",
    name: "Command Palette",
    description:
      "Searchable command interface with keyboard navigation and active selection.",
    category: "Overlays",

    preview: <CommandPalettePreview />,

    typescript: `import {
  Search,
} from "lucide-react";
import {
  useState,
} from "react";

function CommandPalette() {
  const [query, setQuery] =
    useState("");

  const [selected, setSelected] =
    useState(0);

  const items = [
    "Dashboard",
    "Projects",
    "Settings",
  ];

  const filtered =
    items.filter((item) =>
      item
        .toLowerCase()
        .includes(
          query.toLowerCase(),
        ),
    );

  return (
    <div className="rounded-2xl border bg-white shadow-2xl">
      <div className="flex items-center gap-3 border-b px-4">
        <Search size={17} />

        <input
          value={query}
          onChange={(event) =>
            setQuery(
              event.target.value,
            )
          }
          className="h-14 flex-1 outline-none"
        />
      </div>

      {filtered.map(
        (item, index) => (
          <button
            key={item}
            onMouseEnter={() =>
              setSelected(index)
            }
            className={
              selected === index
                ? "bg-zinc-100"
                : ""
            }
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}

export default CommandPalette;`,

    tailwind: `rounded-2xl
border
border-zinc-200
bg-white
shadow-2xl

border-b
px-4

max-h-64
overflow-auto
p-2`,

    javascript: `function moveSelection(
  direction,
  currentIndex,
  itemCount,
) {
  if (direction === "down") {
    return Math.min(
      currentIndex + 1,
      itemCount - 1,
    );
  }

  if (direction === "up") {
    return Math.max(
      currentIndex - 1,
      0,
    );
  }

  return currentIndex;
}

function filterCommands(
  commands,
  query,
) {
  return commands.filter(
    (command) =>
      command.label
        .toLowerCase()
        .includes(
          query.toLowerCase(),
        ),
  );
}`,
  },

  {
    id: "morphing-navbar",
    name: "Morphing Navbar",
    description:
      "Navigation bar that smoothly expands into an interactive menu.",
    category: "Navigation",

    preview: <MorphingNavbarPreview />,

    typescript: `import {
  Menu,
  X,
} from "lucide-react";
import {
  useState,
} from "react";

function MorphingNavbar() {
  const [expanded, setExpanded] =
    useState(false);

  const [active, setActive] =
    useState("Home");

  const items = [
    "Home",
    "Components",
    "Docs",
  ];

  return (
    <nav
      style={{
        width: expanded
          ? 420
          : 250,
        borderRadius: expanded
          ? 24
          : 999,
      }}
      className="overflow-hidden border bg-white shadow-xl transition-all"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <span>UI</span>

        <button
          onClick={() =>
            setExpanded(
              !expanded,
            )
          }
        >
          {expanded ? (
            <X />
          ) : (
            <Menu />
          )}
        </button>
      </div>

      {expanded && (
        <div className="grid grid-cols-2 gap-2 p-4">
          {items.map((item) => (
            <button
              key={item}
              onClick={() =>
                setActive(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default MorphingNavbar;`,

    tailwind: `overflow-hidden
border
border-zinc-200
bg-white
shadow-xl

flex
h-14
items-center
justify-between
px-4`,

    javascript: `function getNavbarState(
  expanded,
) {
  return {
    width: expanded
      ? 420
      : 250,

    borderRadius:
      expanded
        ? 24
        : 999,

    maxHeight:
      expanded
        ? 210
        : 0,

    opacity:
      expanded
        ? 1
        : 0,
  };
}`,
  },
];
