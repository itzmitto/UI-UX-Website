import {
  Check,
  Copy,
  Expand,
  Laptop,
  Maximize2,
  Minimize2,
  Monitor,
  Smartphone,
  X,
} from "lucide-react";
import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { UIComponent } from "../../types/component";

type ComponentModalProps = {
  component: UIComponent | null;
  onClose: () => void;
};

type Tab =
  | "preview"
  | "react"
  | "javascript";

type Device =
  | "desktop"
  | "tablet"
  | "phone";

const tabs: {
  id: Tab;
  label: string;
}[] = [
  {
    id: "preview",
    label: "Preview",
  },
  {
    id: "react",
    label: "React",
  },
  {
    id: "javascript",
    label: "JavaScript",
  },
];

const devices: {
  id: Device;
  label: string;
  icon: typeof Monitor;
  width: number;
}[] = [
  {
    id: "desktop",
    label: "Desktop",
    icon: Monitor,
    width: 1200,
  },
  {
    id: "tablet",
    label: "Tablet",
    icon: Laptop,
    width: 768,
  },
  {
    id: "phone",
    label: "Phone",
    icon: Smartphone,
    width: 390,
  },
];

function ComponentModal({
  component,
  onClose,
}: ComponentModalProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("preview");

  const [device, setDevice] =
    useState<Device>("desktop");

  const [fullscreen, setFullscreen] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const modalRef =
    useRef<HTMLDivElement>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const previousFocusRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!component) {
      return;
    }

    previousFocusRef.current =
      document.activeElement as HTMLElement;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow =
        previousOverflow;

      previousFocusRef.current?.focus();
    };
  }, [component]);

  useEffect(() => {
    if (!component) {
      return;
    }

    setActiveTab("preview");
    setDevice("desktop");
    setFullscreen(false);
    setCopied(false);
  }, [component]);

  useEffect(() => {
    if (!component) {
      return;
    }

    const handleKeyDown = (
      event: globalThis.KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (fullscreen) {
          setFullscreen(false);
          return;
        }

        onClose();
        return;
      }

      if (
        event.key !== "Tab" ||
        !modalRef.current
      ) {
        return;
      }

      const focusableElements =
        modalRef.current.querySelectorAll<HTMLElement>(
          [
            "button:not([disabled])",
            "[href]",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        );

      if (
        focusableElements.length === 0
      ) {
        return;
      }

      const first =
        focusableElements[0];

      const last =
        focusableElements[
          focusableElements.length -
            1
        ];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    component,
    fullscreen,
    onClose,
  ]);

  if (!component) {
    return null;
  }

  const componentFileName =
    component.name
      .replace(
        /[^a-zA-Z0-9\s]/g,
        "",
      )
      .split(/\s+/)
      .filter(Boolean)
      .map(
        (word) =>
          word.charAt(0)
            .toUpperCase() +
          word.slice(1),
      )
      .join("");

  const javascriptCode =
    component.javascript ??
    `// This component does not require additional JavaScript.
//
// All interaction is handled directly inside the React component.`;

  const code =
    activeTab === "react"
      ? component.typescript
      : javascriptCode;

  const language =
    activeTab === "react"
      ? "tsx"
      : "javascript";

  const fileName =
    activeTab === "react"
      ? `${componentFileName}.tsx`
      : `${componentFileName}.js`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      code,
    );

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  const handleOverlayMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  };

  const handleModalKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
  };

  const currentDevice =
    devices.find(
      (item) =>
        item.id === device,
    ) ?? devices[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/45 p-4 backdrop-blur-[2px]"
      onMouseDown={
        handleOverlayMouseDown
      }
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="component-modal-title"
        onKeyDown={
          handleModalKeyDown
        }
        className={`flex overflow-hidden border border-zinc-200 bg-white shadow-[0_35px_100px_rgba(0,0,0,0.28)] transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
          fullscreen
            ? "h-[calc(100vh-24px)] w-[calc(100vw-24px)] rounded-2xl"
            : "h-[min(760px,calc(100vh-48px))] w-full max-w-[1150px] rounded-2xl"
        }`}
      >
        <div className="flex min-h-0 w-full flex-col">
          <header className="shrink-0 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between gap-5 px-6 py-5">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-blue-500">
                  {
                    component.category
                  }
                </p>

                <h2
                  id="component-modal-title"
                  className="mt-1 text-xl font-semibold tracking-tight text-zinc-950 dark:text-white"
                >
                  {component.name}
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-5 text-zinc-500 dark:text-zinc-400">
                  {
                    component.description
                  }
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setFullscreen(
                      (current) =>
                        !current,
                    )
                  }
                  aria-label={
                    fullscreen
                      ? "Exit fullscreen"
                      : "Open fullscreen"
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-300"
                >
                  {fullscreen ? (
                    <Minimize2
                      size={17}
                    />
                  ) : (
                    <Maximize2
                      size={17}
                    />
                  )}
                </button>

                <button
                  ref={
                    closeButtonRef
                  }
                  type="button"
                  onClick={onClose}
                  aria-label="Close component"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 px-4 sm:px-6">
              <div
                role="tablist"
                aria-label="Component viewer"
                className="flex min-w-0 gap-1 overflow-x-auto"
              >
                {tabs.map((tab) => {
                  const active =
                    activeTab ===
                    tab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={
                        active
                      }
                      onClick={() =>
                        setActiveTab(
                          tab.id,
                        )
                      }
                      className={`relative shrink-0 px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                      }`}
                    >
                      {tab.label}

                      {active && (
                        <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-blue-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              {activeTab ===
                "preview" && (
                <div className="hidden items-center gap-1 pb-2 sm:flex">
                  {devices.map(
                    ({
                      id,
                      label,
                      icon: Icon,
                    }) => {
                      const active =
                        device === id;

                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() =>
                            setDevice(
                              id,
                            )
                          }
                          aria-label={`${label} preview`}
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                            active
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                              : "text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900"
                          }`}
                        >
                          <Icon
                            size={14}
                          />
                        </button>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-hidden">
            {activeTab ===
            "preview" ? (
              <div className="flex h-full min-h-0 flex-col bg-zinc-100/70 dark:bg-zinc-900/50">
                <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5 py-2.5 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex items-center gap-2">
                    <Expand
                      size={13}
                      className="text-blue-500"
                    />

                    <span className="text-[10px] font-medium text-zinc-400">
                      Interactive
                      preview
                    </span>
                  </div>

                  <span className="text-[10px] text-zinc-400">
                    {
                      currentDevice.label
                    }{" "}
                    ·{" "}
                    {
                      currentDevice.width
                    }
                    px
                  </span>
                </div>

                <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto p-5 sm:p-8">
                  <div
                    className="flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-[max-width] duration-300 dark:border-zinc-800 dark:bg-zinc-950"
                    style={{
                      maxWidth:
                        currentDevice.width,
                    }}
                  >
                    {
                      component.preview
                    }
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-0 flex-col bg-[#282c34]">
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#21252b] px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>

                    <span className="truncate font-mono text-[11px] text-zinc-400">
                      {fileName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={
                      handleCopy
                    }
                    className={`flex h-8 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${
                      copied
                        ? "bg-blue-300 text-zinc-950"
                        : "text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {copied ? (
                      <Check
                        size={14}
                      />
                    ) : (
                      <Copy
                        size={14}
                      />
                    )}

                    {copied
                      ? "Copied"
                      : "Copy code"}
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-auto">
                  <SyntaxHighlighter
                    language={
                      language
                    }
                    style={oneDark}
                    showLineNumbers
                    wrapLongLines={
                      false
                    }
                    customStyle={{
                      margin: 0,
                      minHeight:
                        "100%",
                      padding:
                        "24px",
                      background:
                        "#282c34",
                      fontSize:
                        "13px",
                      lineHeight:
                        "1.7",
                    }}
                    lineNumberStyle={{
                      minWidth:
                        "2.5em",
                      paddingRight:
                        "16px",
                      color:
                        "#636d83",
                      userSelect:
                        "none",
                    }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
          </main>

          <footer className="flex h-10 shrink-0 items-center justify-between border-t border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
            <span className="text-[10px] font-medium text-blue-400">
              {activeTab ===
              "preview"
                ? "Component preview"
                : activeTab ===
                    "react"
                  ? "React + TypeScript + Tailwind"
                  : "JavaScript"}
            </span>

            <span className="text-[10px] text-zinc-400">
              ESC closes viewer
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ComponentModal;