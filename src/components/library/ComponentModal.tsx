import {
  Check,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { UIComponent } from "../../types/component";

type ComponentModalProps = {
  component: UIComponent | null;
  onClose: () => void;
};

type Tab = "preview" | "typescript" | "tailwind";
type Device = "desktop" | "tablet" | "phone";

function ComponentModal({
  component,
  onClose,
}: ComponentModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [device, setDevice] = useState<Device>("desktop");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!component) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [component, onClose]);

  useEffect(() => {
    setActiveTab("preview");
    setDevice("desktop");
    setCopied(false);
  }, [component]);

  if (!component) {
    return null;
  }

  const code =
    activeTab === "typescript"
      ? component.typescript
      : component.tailwind;

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const deviceWidth = {
    desktop: "w-full",
    tablet: "w-[768px] max-w-full",
    phone: "w-[390px] max-w-full",
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-200 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              {component.category}
            </p>

            <h2 className="mt-1 text-xl font-semibold text-zinc-950">
              {component.name}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {component.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-zinc-200 px-6">
          <div className="flex">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === "preview"
                  ? "border-zinc-950 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-950"
              }`}
            >
              Preview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("typescript")}
              className={`border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === "typescript"
                  ? "border-zinc-950 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-950"
              }`}
            >
              TypeScript
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tailwind")}
              className={`border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === "tailwind"
                  ? "border-zinc-950 text-zinc-950"
                  : "border-transparent text-zinc-500 hover:text-zinc-950"
              }`}
            >
              Tailwind
            </button>
          </div>

          {activeTab === "preview" && (
            <div className="hidden items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 md:flex">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                aria-label="Desktop preview"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                  device === "desktop"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-950"
                }`}
              >
                <Monitor size={16} />
              </button>

              <button
                type="button"
                onClick={() => setDevice("tablet")}
                aria-label="Tablet preview"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                  device === "tablet"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-950"
                }`}
              >
                <Tablet size={16} />
              </button>

              <button
                type="button"
                onClick={() => setDevice("phone")}
                aria-label="Phone preview"
                className={`flex h-8 w-8 items-center justify-center rounded-md transition ${
                  device === "phone"
                    ? "bg-white text-zinc-950 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-950"
                }`}
              >
                <Smartphone size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          {activeTab === "preview" ? (
            <div className="min-h-[500px] bg-zinc-100 p-6">
              <div className="flex min-h-[450px] justify-center overflow-auto">
                <div
                  className={`${deviceWidth[device]} min-h-[420px] transition-all duration-300`}
                >
                  <div className="flex h-full min-h-[420px] items-center justify-center rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
                    {component.preview}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-zinc-950">
              <button
                type="button"
                onClick={copyCode}
                className="absolute right-5 top-5 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>

              <pre className="min-h-[500px] overflow-auto p-7 pr-28 text-sm leading-7 text-zinc-200">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ComponentModal;