import AdaptiveFlyInPreview from "../components/previews/AdaptiveFlyInPreview";
import type { UIComponent } from "../types/component";

export const flyIns: UIComponent[] = [
  {
    id: "adaptive-settings-fly-in",
    name: "Adaptive Settings Fly-In",
    description:
      "Advanced settings fly-in with animated mounting, drag-to-close, tabs, responsive sizing, focus restoration and interactive preferences.",
    category: "Fly-ins",

    preview: <AdaptiveFlyInPreview />,

    typescript: `import {
  Bell,
  Check,
  Maximize2,
  Minimize2,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import {
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type FlyInTab =
  | "general"
  | "notifications"
  | "security";

const CLOSE_DURATION = 280;
const DRAG_CLOSE_DISTANCE = 90;

function FlyIn() {
  const [mounted, setMounted] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [wide, setWide] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<FlyInTab>("general");

  const [dragOffset, setDragOffset] =
    useState(0);

  const [dragging, setDragging] =
    useState(false);

  const startX = useRef(0);

  const triggerRef =
    useRef<HTMLButtonElement>(null);

  const closeRef =
    useRef<HTMLButtonElement>(null);

  const openFlyIn = () => {
    setMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);

        closeRef.current?.focus();
      });
    });
  };

  const closeFlyIn = () => {
    setOpen(false);
    setDragOffset(0);

    window.setTimeout(() => {
      setMounted(false);

      triggerRef.current?.focus();
    }, CLOSE_DURATION);
  };

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        closeFlyIn();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown,
      );
  }, [mounted]);

  const pointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    startX.current =
      event.clientX;

    setDragging(true);

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  };

  const pointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!dragging) {
      return;
    }

    setDragOffset(
      Math.max(
        0,
        event.clientX -
          startX.current,
      ),
    );
  };

  const pointerUp = () => {
    setDragging(false);

    if (
      dragOffset >
      DRAG_CLOSE_DISTANCE
    ) {
      closeFlyIn();
      return;
    }

    setDragOffset(0);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openFlyIn}
        className="rounded-xl bg-blue-300 px-5 py-2.5"
      >
        Open settings
      </button>

      {mounted && (
        <div
          className="fixed inset-0 bg-zinc-950/25"
          onClick={closeFlyIn}
        >
          <aside
            onClick={(event) =>
              event.stopPropagation()
            }
            className="absolute bottom-0 right-0 top-0 bg-white shadow-2xl"
            style={{
              width: wide
                ? 520
                : 410,

              transform: open
                ? \`translateX(\${dragOffset}px)\`
                : "translateX(100%)",

              transition:
                dragging
                  ? "none"
                  : "transform 280ms cubic-bezier(.22,.8,.22,1)",
            }}
          >
            <div
              onPointerDown={
                pointerDown
              }
              onPointerMove={
                pointerMove
              }
              onPointerUp={
                pointerUp
              }
            >
              Drag to close
            </div>

            <button
              onClick={() =>
                setWide(
                  !wide,
                )
              }
            >
              {wide ? (
                <Minimize2 />
              ) : (
                <Maximize2 />
              )}
            </button>

            <button
              ref={closeRef}
              onClick={
                closeFlyIn
              }
            >
              <X />
            </button>

            <nav>
              <button
                onClick={() =>
                  setActiveTab(
                    "general",
                  )
                }
              >
                <User />
                General
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "notifications",
                  )
                }
              >
                <Bell />
                Notifications
              </button>

              <button
                onClick={() =>
                  setActiveTab(
                    "security",
                  )
                }
              >
                <Shield />
                Security
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default FlyIn;`,

    tailwind: `Trigger:
rounded-xl
bg-blue-300
px-5
py-2.5
text-sm
font-medium
text-zinc-950
hover:bg-blue-400

Backdrop:
absolute
inset-0
bg-zinc-950/25

Fly-in:
absolute
bottom-0
right-0
top-0
border-l
border-blue-100
bg-white
shadow-2xl

Header:
border-b
border-zinc-100
px-5
py-4

Tabs:
grid
grid-cols-3
rounded-xl
bg-zinc-100
p-1

Active tab:
bg-white
text-blue-700
shadow-sm

Inputs:
rounded-xl
border
border-zinc-200
focus:border-blue-300
focus:ring-4
focus:ring-blue-100

Primary action:
bg-blue-300
text-zinc-950
hover:bg-blue-400`,

    javascript: `const CLOSE_DURATION = 280;
const DRAG_CLOSE_DISTANCE = 90;

let mounted = false;
let open = false;
let dragging = false;
let startX = 0;
let dragOffset = 0;

function openFlyIn() {
  mounted = true;

  requestAnimationFrame(() => {
    open = true;
  });
}

function closeFlyIn() {
  open = false;
  dragging = false;
  dragOffset = 0;

  window.setTimeout(() => {
    mounted = false;
  }, CLOSE_DURATION);
}

function startDrag(clientX) {
  dragging = true;
  startX = clientX;
}

function updateDrag(clientX) {
  if (!dragging) {
    return 0;
  }

  dragOffset = Math.max(
    0,
    clientX - startX,
  );

  return dragOffset;
}

function finishDrag() {
  dragging = false;

  if (
    dragOffset >=
    DRAG_CLOSE_DISTANCE
  ) {
    closeFlyIn();

    return true;
  }

  dragOffset = 0;

  return false;
}

function getPanelTransform() {
  if (!open) {
    return "translateX(100%)";
  }

  return \`translateX(\${dragOffset}px)\`;
}`,
  },
];
