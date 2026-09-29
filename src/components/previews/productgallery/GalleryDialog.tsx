import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

type GalleryDialogProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function GalleryDialog({
  open,
  onClose,
  children,
}: GalleryDialogProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        onClose();

        return;
      }

      if (event.key !== "Tab" || !rootRef.current) return;

      const focusable =
        rootRef.current.querySelectorAll<HTMLElement>(
          [
            "button:not([disabled])",
            "[href]",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();

        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();

        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);

    requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLElement>("button:not([disabled])")
        ?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown, true);

      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Product image gallery"
      className="product-gallery-dialog-backdrop"
    >
      <div className="product-gallery-dialog-root">{children}</div>
    </div>
  );
}

export default GalleryDialog;