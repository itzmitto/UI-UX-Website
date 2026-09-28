import {
  Bell,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  Settings,
  Shield,
  User,
  X,
} from "lucide-react";
import { type PointerEvent, useEffect, useRef, useState } from "react";

type FlyInTab = "general" | "notifications" | "security";

const CLOSE_DURATION = 280;
const DRAG_CLOSE_DISTANCE = 90;

const tabs: {
  id: FlyInTab;
  label: string;
  icon: typeof Settings;
}[] = [
  {
    id: "general",
    label: "General",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? "bg-blue-300" : "bg-zinc-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export function AdaptiveFlyInPreview() {
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);

  const [wide, setWide] = useState(false);

  const [activeTab, setActiveTab] = useState<FlyInTab>("general");

  const [emailUpdates, setEmailUpdates] = useState(true);

  const [pushUpdates, setPushUpdates] = useState(false);

  const [securityAlerts, setSecurityAlerts] = useState(true);

  const [saved, setSaved] = useState(false);

  const [dragOffset, setDragOffset] = useState(0);

  const [dragging, setDragging] = useState(false);

  const dragStartX = useRef(0);

  const openButtonRef = useRef<HTMLButtonElement>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeTimer = useRef<number | null>(null);

  const openFlyIn = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }

    setMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOpen(true);

        closeButtonRef.current?.focus();
      });
    });
  };

  const closeFlyIn = () => {
    setOpen(false);
    setDragging(false);
    setDragOffset(0);

    closeTimer.current = window.setTimeout(() => {
      setMounted(false);

      openButtonRef.current?.focus();
    }, CLOSE_DURATION);
  };

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeFlyIn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        window.clearTimeout(closeTimer.current);
      }
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;

    setDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) {
      return;
    }

    const distance = event.clientX - dragStartX.current;

    setDragOffset(Math.max(0, distance));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragging(false);

    if (dragOffset >= DRAG_CLOSE_DISTANCE) {
      closeFlyIn();
      return;
    }

    setDragOffset(0);
  };

  const saveChanges = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 1600);
  };

  return (
    <div className="relative flex min-h-[430px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-zinc-50">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <Settings size={20} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-zinc-950">
          Workspace settings
        </h3>

        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">
          Open the advanced fly-in panel to manage your preferences.
        </p>

        <button
          ref={openButtonRef}
          type="button"
          onClick={openFlyIn}
          className="mt-5 rounded-xl bg-blue-300 px-5 py-2.5 text-sm font-medium text-zinc-950 shadow-sm transition hover:bg-blue-400 hover:shadow-md"
        >
          Open settings
        </button>
      </div>

      {mounted && (
        <div
          className={`absolute inset-0 z-20 transition-colors duration-300 ${
            open ? "bg-zinc-950/25" : "bg-transparent"
          }`}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              closeFlyIn();
            }
          }}
        >
          <aside
            className={`absolute bottom-0 right-0 top-0 flex flex-col border-l border-blue-100 bg-white shadow-2xl transition-[width,transform] ${
              wide ? "w-[min(92%,520px)]" : "w-[min(88%,410px)]"
            }`}
            style={{
              transform: open
                ? `translateX(${dragOffset}px)`
                : "translateX(100%)",
              transitionDuration: dragging ? "0ms" : `${CLOSE_DURATION}ms`,
              transitionTimingFunction: "cubic-bezier(.22,.8,.22,1)",
            }}
          >
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`touch-none border-b border-zinc-100 px-5 py-4 ${
                dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-blue-200" />

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-500">
                    Settings
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-zinc-950">
                    Workspace preferences
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setWide((current) => !current)}
                    aria-label={wide ? "Compact fly-in" : "Expand fly-in"}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    {wide ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </button>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={closeFlyIn}
                    aria-label="Close settings"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <X size={17} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-zinc-100 p-3">
              <div className="grid grid-cols-3 gap-1 rounded-xl bg-zinc-100 p-1">
                {tabs.map(({ id, label, icon: Icon }) => {
                  const active = activeTab === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-medium transition ${
                        active
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-zinc-500 hover:text-zinc-950"
                      }`}
                    >
                      <Icon size={13} />

                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {activeTab === "general" && (
                <div className="space-y-5">
                  <div>
                    <p className="text-xs font-semibold text-zinc-950">
                      Profile
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      General workspace information.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-300 font-semibold text-zinc-950">
                        UI
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-950">
                          UIUX Library
                        </p>

                        <p className="text-xs text-zinc-400">
                          Design workspace
                        </p>
                      </div>

                      <ChevronRight size={16} className="text-blue-400" />
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-xs font-medium text-zinc-700">
                      Workspace name
                    </span>

                    <input
                      defaultValue="UIUX Library"
                      className="mt-2 h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-zinc-700">
                      Description
                    </span>

                    <textarea
                      defaultValue="Reusable components for modern interfaces."
                      rows={3}
                      className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-3">
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-zinc-950">
                      Notifications
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      Choose which updates you want to receive.
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-800">
                        Email updates
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Product and library updates.
                      </p>
                    </div>

                    <Toggle
                      checked={emailUpdates}
                      onChange={() => setEmailUpdates((current) => !current)}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-800">
                        Push notifications
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Important activity notifications.
                      </p>
                    </div>

                    <Toggle
                      checked={pushUpdates}
                      onChange={() => setPushUpdates((current) => !current)}
                    />
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-zinc-950">
                      Security
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      Protect your workspace and account.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-300 text-zinc-950">
                        <Shield size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-zinc-950">
                          Workspace protected
                        </p>

                        <p className="mt-1 text-xs leading-5 text-zinc-500">
                          Security checks are enabled for this workspace.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-800">
                        Security alerts
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Get notified about unusual activity.
                      </p>
                    </div>

                    <Toggle
                      checked={securityAlerts}
                      onChange={() => setSecurityAlerts((current) => !current)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-100 bg-white p-4">
              <button
                type="button"
                onClick={saveChanges}
                className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition ${
                  saved
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-blue-300 text-zinc-950 hover:bg-blue-400"
                }`}
              >
                {saved ? (
                  <>
                    <Check size={15} />
                    Saved
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default AdaptiveFlyInPreview;
