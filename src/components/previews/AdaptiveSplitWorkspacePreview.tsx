import {
  Code2,
  Eye,
  FileCode2,
  Folder,
  GripVertical,
  Monitor,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
  Smartphone,
} from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type MobilePanel = "code" | "preview";

const MIN_RATIO = 28;
const MAX_RATIO = 72;
const DEFAULT_RATIO = 44;
const COMPACT_BREAKPOINT = 560;

const files = [
  {
    name: "App.tsx",
    type: "tsx",
  },
  {
    name: "Button.tsx",
    type: "tsx",
  },
  {
    name: "styles.css",
    type: "css",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function AdaptiveSplitWorkspacePreview() {
  const workspaceRef = useRef<HTMLDivElement>(null);

  const [ratio, setRatio] = useState(DEFAULT_RATIO);

  const [compact, setCompact] = useState(false);

  const [dragging, setDragging] = useState(false);

  const [leftCollapsed, setLeftCollapsed] = useState(false);

  const [rightCollapsed, setRightCollapsed] = useState(false);

  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("code");

  const [activeFile, setActiveFile] = useState("App.tsx");

  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const workspace = workspaceRef.current;

    if (!workspace) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < COMPACT_BREAKPOINT);
    });

    observer.observe(workspace);

    return () => {
      observer.disconnect();
    };
  }, []);

  const pointerToRatio = (clientX: number) => {
    const workspace = workspaceRef.current;

    if (!workspace) {
      return ratio;
    }

    const rect = workspace.getBoundingClientRect();

    const nextRatio = ((clientX - rect.left) / rect.width) * 100;

    return clamp(nextRatio, MIN_RATIO, MAX_RATIO);
  };

  const startResize = (event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    setLeftCollapsed(false);
    setRightCollapsed(false);
    setDragging(true);

    setRatio(pointerToRatio(event.clientX));
  };

  const moveResize = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging) {
      return;
    }

    setRatio(pointerToRatio(event.clientX));
  };

  const finishResize = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setDragging(false);
  };

  const handleDividerKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setLeftCollapsed(false);
      setRightCollapsed(false);

      setRatio((current) => clamp(current - 2, MIN_RATIO, MAX_RATIO));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setLeftCollapsed(false);
      setRightCollapsed(false);

      setRatio((current) => clamp(current + 2, MIN_RATIO, MAX_RATIO));
    }

    if (event.key === "Home") {
      event.preventDefault();

      setLeftCollapsed(false);
      setRightCollapsed(false);
      setRatio(MIN_RATIO);
    }

    if (event.key === "End") {
      event.preventDefault();

      setLeftCollapsed(false);
      setRightCollapsed(false);
      setRatio(MAX_RATIO);
    }
  };

  const collapseLeft = () => {
    setRightCollapsed(false);

    setLeftCollapsed((current) => !current);
  };

  const collapseRight = () => {
    setLeftCollapsed(false);

    setRightCollapsed((current) => !current);
  };

  const resetWorkspace = () => {
    setRatio(DEFAULT_RATIO);
    setLeftCollapsed(false);
    setRightCollapsed(false);
    setDevice("desktop");
  };

  const gridTemplateColumns = leftCollapsed
    ? "46px 10px minmax(0, 1fr)"
    : rightCollapsed
      ? "minmax(0, 1fr) 10px 46px"
      : `${ratio}% 10px minmax(0, 1fr)`;

  const codePanel = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-zinc-950">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-zinc-800 px-3">
        {!leftCollapsed && (
          <div className="flex items-center gap-2">
            <Code2 size={14} className="text-blue-300" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
              Editor
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={collapseLeft}
          aria-label={leftCollapsed ? "Open code panel" : "Collapse code panel"}
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-800 hover:text-blue-300"
        >
          {leftCollapsed ? (
            <PanelLeftOpen size={14} />
          ) : (
            <PanelLeftClose size={14} />
          )}
        </button>
      </div>

      {leftCollapsed ? (
        <div className="flex flex-1 flex-col items-center gap-3 pt-4">
          <FileCode2 size={16} className="text-blue-300" />

          <div className="h-px w-5 bg-zinc-800" />

          {files.map((file) => (
            <button
              key={file.name}
              type="button"
              onClick={() => {
                setLeftCollapsed(false);

                setActiveFile(file.name);
              }}
              className={`h-2 w-2 rounded-full transition ${
                activeFile === file.name
                  ? "bg-blue-300"
                  : "bg-zinc-700 hover:bg-zinc-500"
              }`}
              aria-label={`Open ${file.name}`}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex shrink-0 items-center gap-1 border-b border-zinc-800 bg-zinc-900/70 px-2 py-1.5">
            {files.map((file) => (
              <button
                key={file.name}
                type="button"
                onClick={() => setActiveFile(file.name)}
                className={`flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-[9px] transition ${
                  activeFile === file.name
                    ? "bg-zinc-800 text-blue-300"
                    : "text-zinc-500 hover:bg-zinc-800/70 hover:text-zinc-300"
                }`}
              >
                <FileCode2 size={11} />

                <span className="max-w-[64px] truncate">{file.name}</span>
              </button>
            ))}
          </div>

          <div className="flex min-h-0 flex-1">
            <div className="hidden w-28 shrink-0 border-r border-zinc-800 bg-zinc-900/40 p-2 sm:block">
              <div className="mb-2 flex items-center gap-1.5 px-1 text-[8px] font-semibold uppercase tracking-wider text-zinc-500">
                <Folder size={10} />
                src
              </div>

              {files.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => setActiveFile(file.name)}
                  className={`flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-[8px] transition ${
                    activeFile === file.name
                      ? "bg-blue-300/10 text-blue-300"
                      : "text-zinc-500 hover:bg-zinc-800"
                  }`}
                >
                  <FileCode2 size={9} />

                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>

            <div className="min-w-0 flex-1 overflow-hidden p-3 font-mono text-[9px] leading-[1.7]">
              {activeFile === "App.tsx" && (
                <>
                  <div>
                    <span className="text-violet-300">import</span>{" "}
                    <span className="text-zinc-300">Button</span>{" "}
                    <span className="text-violet-300">from</span>{" "}
                    <span className="text-emerald-300">"./Button"</span>;
                  </div>

                  <div className="mt-3 text-zinc-500">04</div>

                  <div>
                    <span className="text-violet-300">function</span>{" "}
                    <span className="text-blue-300">App</span>
                    <span className="text-zinc-300">()</span>{" "}
                    <span className="text-zinc-300">{"{"}</span>
                  </div>

                  <div className="pl-4 text-zinc-300">return (</div>

                  <div className="pl-8">
                    <span className="text-blue-300">{"<main"}</span>{" "}
                    <span className="text-sky-200">className</span>
                    <span className="text-zinc-400">=</span>
                    <span className="text-emerald-300">"workspace"</span>
                    <span className="text-blue-300">{">"}</span>
                  </div>

                  <div className="pl-12">
                    <span className="text-blue-300">{"<Button"}</span>{" "}
                    <span className="text-sky-200">variant</span>
                    <span className="text-zinc-400">=</span>
                    <span className="text-emerald-300">"primary"</span>{" "}
                    <span className="text-blue-300">{"/>"}</span>
                  </div>

                  <div className="pl-8 text-blue-300">{"</main>"}</div>

                  <div className="pl-4 text-zinc-300">);</div>

                  <div className="text-zinc-300">{"}"}</div>
                </>
              )}

              {activeFile === "Button.tsx" && (
                <>
                  <div>
                    <span className="text-violet-300">type</span>{" "}
                    <span className="text-blue-300">Props</span>{" "}
                    <span className="text-zinc-300">= {"{"}</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-200">variant</span>
                    <span className="text-zinc-300">:</span>{" "}
                    <span className="text-emerald-300">"primary"</span>;
                  </div>

                  <div className="text-zinc-300">{"};"}</div>

                  <div className="mt-3">
                    <span className="text-violet-300">export</span>{" "}
                    <span className="text-violet-300">default</span>{" "}
                    <span className="text-violet-300">function</span>{" "}
                    <span className="text-blue-300">Button</span>
                    <span className="text-zinc-300">()</span>{" "}
                    <span className="text-zinc-300">{"{"}</span>
                  </div>

                  <div className="pl-4 text-zinc-300">
                    return <span className="text-blue-300">{"<button>"}</span>
                    Launch
                    <span className="text-blue-300">{"</button>"}</span>;
                  </div>

                  <div className="text-zinc-300">{"}"}</div>
                </>
              )}

              {activeFile === "styles.css" && (
                <>
                  <div>
                    <span className="text-blue-300">.workspace</span>{" "}
                    <span className="text-zinc-300">{"{"}</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-200">display</span>
                    <span className="text-zinc-300">:</span>{" "}
                    <span className="text-emerald-300">grid</span>;
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-200">place-items</span>
                    <span className="text-zinc-300">:</span>{" "}
                    <span className="text-emerald-300">center</span>;
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-200">background</span>
                    <span className="text-zinc-300">:</span>{" "}
                    <span className="text-emerald-300">#eff6ff</span>;
                  </div>

                  <div className="text-zinc-300">{"}"}</div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const previewPanel = (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-zinc-200 px-3">
        {!rightCollapsed && (
          <>
            <Eye size={14} className="text-blue-500" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Preview
            </span>

            <div className="ml-auto flex rounded-lg bg-zinc-100 p-0.5">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                  device === "desktop"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-zinc-400"
                }`}
                aria-label="Desktop preview"
              >
                <Monitor size={12} />
              </button>

              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                  device === "mobile"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-zinc-400"
                }`}
                aria-label="Mobile preview"
              >
                <Smartphone size={12} />
              </button>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={collapseRight}
          aria-label={
            rightCollapsed ? "Open preview panel" : "Collapse preview panel"
          }
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600 ${
            rightCollapsed ? "ml-auto" : ""
          }`}
        >
          {rightCollapsed ? (
            <PanelRightOpen size={14} />
          ) : (
            <PanelRightClose size={14} />
          )}
        </button>
      </div>

      {rightCollapsed ? (
        <div className="flex flex-1 flex-col items-center gap-3 pt-4">
          <Eye size={16} className="text-blue-500" />

          <div className="h-px w-5 bg-zinc-200" />

          <span className="h-2 w-2 rounded-full bg-blue-300" />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-zinc-50 p-4">
          <div
            className={`flex items-center justify-center overflow-hidden border border-blue-100 bg-white shadow-[0_20px_45px_rgba(59,130,246,0.10)] transition-all duration-300 ${
              device === "mobile"
                ? "h-[250px] w-[150px] rounded-[24px]"
                : "h-[230px] w-full max-w-[330px] rounded-2xl"
            }`}
          >
            <div className="w-full p-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-300 text-lg font-black text-zinc-950 shadow-sm">
                UI
              </div>

              <h3 className="mt-4 text-sm font-semibold text-zinc-950">
                Build interfaces faster
              </h3>

              <p className="mx-auto mt-2 max-w-[220px] text-[9px] leading-4 text-zinc-500">
                Responsive components with polished interaction states.
              </p>

              <button
                type="button"
                className="mt-4 rounded-xl bg-blue-300 px-4 py-2 text-[9px] font-semibold text-zinc-950 shadow-sm transition hover:bg-blue-400"
              >
                Launch project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={workspaceRef}
      className="w-full max-w-[760px] overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_24px_60px_rgba(59,130,246,0.10)]"
    >
      <div className="flex h-12 items-center justify-between border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-300 text-zinc-950">
            <Code2 size={13} />
          </div>

          <div>
            <p className="text-[10px] font-semibold text-zinc-900">
              Split Workspace
            </p>

            <p className="text-[8px] text-zinc-400">Adaptive editor</p>
          </div>
        </div>

        <button
          type="button"
          onClick={resetWorkspace}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-blue-100 bg-white px-2.5 text-[9px] font-medium text-zinc-500 shadow-sm transition hover:bg-blue-50 hover:text-blue-600"
        >
          <RotateCcw size={11} />
          Reset
        </button>
      </div>

      {compact ? (
        <div className="h-[390px]">
          <div className="grid h-11 grid-cols-2 border-b border-zinc-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setMobilePanel("code")}
              className={`flex items-center justify-center gap-2 rounded-lg text-[10px] font-medium transition ${
                mobilePanel === "code"
                  ? "bg-blue-50 text-blue-700"
                  : "text-zinc-400"
              }`}
            >
              <Code2 size={12} />
              Code
            </button>

            <button
              type="button"
              onClick={() => setMobilePanel("preview")}
              className={`flex items-center justify-center gap-2 rounded-lg text-[10px] font-medium transition ${
                mobilePanel === "preview"
                  ? "bg-blue-50 text-blue-700"
                  : "text-zinc-400"
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
          </div>

          <div className="h-[calc(100%-44px)]">
            {mobilePanel === "code" ? codePanel : previewPanel}
          </div>
        </div>
      ) : (
        <div
          className="grid h-[390px] min-h-0"
          style={{
            gridTemplateColumns,
          }}
        >
          {codePanel}

          <button
            type="button"
            role="separator"
            aria-label="Resize panels"
            aria-orientation="vertical"
            aria-valuemin={MIN_RATIO}
            aria-valuemax={MAX_RATIO}
            aria-valuenow={Math.round(ratio)}
            onPointerDown={startResize}
            onPointerMove={moveResize}
            onPointerUp={finishResize}
            onPointerCancel={finishResize}
            onKeyDown={handleDividerKeyboard}
            disabled={leftCollapsed || rightCollapsed}
            className={`group relative flex touch-none items-center justify-center outline-none transition ${
              dragging ? "bg-blue-100" : "bg-zinc-100 hover:bg-blue-50"
            } ${
              leftCollapsed || rightCollapsed
                ? "cursor-default"
                : "cursor-col-resize"
            }`}
          >
            <span
              className={`flex h-12 w-5 items-center justify-center rounded-full border shadow-sm transition ${
                dragging
                  ? "scale-110 border-blue-300 bg-blue-300 text-zinc-950"
                  : "border-zinc-200 bg-white text-zinc-400 group-hover:border-blue-200 group-hover:text-blue-500"
              }`}
            >
              <GripVertical size={12} />
            </span>

            {dragging && (
              <span className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-lg bg-zinc-950 px-2 py-1 font-mono text-[8px] text-white shadow-lg">
                {Math.round(ratio)}%
              </span>
            )}
          </button>

          {previewPanel}
        </div>
      )}
    </div>
  );
}
