import AdaptiveSplitWorkspacePreview from "../components/previews/AdaptiveSplitWorkspacePreview";
import type { UIComponent } from "../types/component";

export const layouts: UIComponent[] = [
  {
    id: "adaptive-split-workspace",
    name: "Adaptive Split Workspace",
    description:
      "Responsive split-pane workspace with pointer resizing, keyboard-accessible divider, collapsible panels, live device previews and ResizeObserver-powered compact mode.",
    category: "Layouts",

    preview: <AdaptiveSplitWorkspacePreview />,

    typescript: `import {
  GripVertical,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const MIN_RATIO = 28;
const MAX_RATIO = 72;
const DEFAULT_RATIO = 44;
const COMPACT_BREAKPOINT = 560;

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    max,
    Math.max(min, value),
  );
}

function SplitWorkspace() {
  const workspaceRef =
    useRef<HTMLDivElement>(null);

  const [ratio, setRatio] =
    useState(DEFAULT_RATIO);

  const [dragging, setDragging] =
    useState(false);

  const [compact, setCompact] =
    useState(false);

  const [leftCollapsed, setLeftCollapsed] =
    useState(false);

  const [rightCollapsed, setRightCollapsed] =
    useState(false);

  useEffect(() => {
    const element =
      workspaceRef.current;

    if (!element) return;

    const observer =
      new ResizeObserver(
        ([entry]) => {
          setCompact(
            entry.contentRect.width <
              COMPACT_BREAKPOINT,
          );
        },
      );

    observer.observe(element);

    return () =>
      observer.disconnect();
  }, []);

  const clientXToRatio = (
    clientX: number,
  ) => {
    const element =
      workspaceRef.current;

    if (!element) {
      return ratio;
    }

    const rect =
      element.getBoundingClientRect();

    return clamp(
      ((clientX - rect.left) /
        rect.width) *
        100,
      MIN_RATIO,
      MAX_RATIO,
    );
  };

  const startResize = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    setDragging(true);

    setRatio(
      clientXToRatio(
        event.clientX,
      ),
    );
  };

  const moveResize = (
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    if (!dragging) return;

    setRatio(
      clientXToRatio(
        event.clientX,
      ),
    );
  };

  const keyboardResize = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();

      setRatio((current) =>
        clamp(
          current - 2,
          MIN_RATIO,
          MAX_RATIO,
        ),
      );
    }

    if (
      event.key === "ArrowRight"
    ) {
      event.preventDefault();

      setRatio((current) =>
        clamp(
          current + 2,
          MIN_RATIO,
          MAX_RATIO,
        ),
      );
    }
  };

  return (
    <div ref={workspaceRef}>
      {compact ? (
        <div>
          Compact workspace
        </div>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns:
              \`\${ratio}% 10px 1fr\`,
          }}
        >
          <section>
            Code editor
          </section>

          <button
            role="separator"
            aria-valuemin={
              MIN_RATIO
            }
            aria-valuemax={
              MAX_RATIO
            }
            aria-valuenow={
              ratio
            }
            onPointerDown={
              startResize
            }
            onPointerMove={
              moveResize
            }
            onPointerUp={() =>
              setDragging(false)
            }
            onKeyDown={
              keyboardResize
            }
          >
            <GripVertical />
          </button>

          <section>
            Live preview
          </section>
        </div>
      )}
    </div>
  );
}

export default SplitWorkspace;`,

    tailwind: `Workspace:
overflow-hidden
rounded-3xl
border
border-blue-100
bg-white
shadow-[0_24px_60px_rgba(59,130,246,0.10)]

Toolbar:
border-b
border-blue-100
bg-gradient-to-r
from-blue-50
via-white
to-blue-50

Editor:
bg-zinc-950
text-zinc-300

Editor active file:
bg-zinc-800
text-blue-300

Preview:
bg-gradient-to-br
from-blue-50
via-white
to-zinc-50

Divider:
bg-zinc-100
hover:bg-blue-50
cursor-col-resize

Divider handle:
rounded-full
border
border-zinc-200
bg-white
hover:border-blue-200
hover:text-blue-500

Dragging:
bg-blue-300
border-blue-300
text-zinc-950
scale-110

Compact tabs:
grid
grid-cols-2
border-b
border-zinc-200

Active compact tab:
bg-blue-50
text-blue-700`,

    javascript: `const MIN_RATIO = 28;
const MAX_RATIO = 72;
const DEFAULT_RATIO = 44;
const COMPACT_BREAKPOINT = 560;

function clamp(
  value,
  min,
  max,
) {
  return Math.min(
    max,
    Math.max(
      min,
      value,
    ),
  );
}

function createResizeObserver(
  element,
  onCompactChange,
) {
  const observer =
    new ResizeObserver(
      ([entry]) => {
        onCompactChange(
          entry.contentRect.width <
            COMPACT_BREAKPOINT,
        );
      },
    );

  observer.observe(element);

  return () =>
    observer.disconnect();
}

function clientXToRatio(
  clientX,
  element,
) {
  const rect =
    element.getBoundingClientRect();

  const percentage =
    ((clientX - rect.left) /
      rect.width) *
    100;

  return clamp(
    percentage,
    MIN_RATIO,
    MAX_RATIO,
  );
}

function createSplitController(
  element,
) {
  let ratio =
    DEFAULT_RATIO;

  let dragging = false;

  function start(
    clientX,
  ) {
    dragging = true;

    ratio =
      clientXToRatio(
        clientX,
        element,
      );

    return ratio;
  }

  function move(
    clientX,
  ) {
    if (!dragging) {
      return ratio;
    }

    ratio =
      clientXToRatio(
        clientX,
        element,
      );

    return ratio;
  }

  function finish() {
    dragging = false;

    return ratio;
  }

  function moveLeft() {
    ratio =
      clamp(
        ratio - 2,
        MIN_RATIO,
        MAX_RATIO,
      );

    return ratio;
  }

  function moveRight() {
    ratio =
      clamp(
        ratio + 2,
        MIN_RATIO,
        MAX_RATIO,
      );

    return ratio;
  }

  function reset() {
    ratio =
      DEFAULT_RATIO;

    dragging = false;

    return ratio;
  }

  return {
    start,
    move,
    finish,
    moveLeft,
    moveRight,
    reset,
  };
}

function getGridColumns({
  ratio,
  leftCollapsed,
  rightCollapsed,
}) {
  if (leftCollapsed) {
    return "46px 10px minmax(0, 1fr)";
  }

  if (rightCollapsed) {
    return "minmax(0, 1fr) 10px 46px";
  }

  return \`\${ratio}% 10px minmax(0, 1fr)\`;
}`,
  },
];
