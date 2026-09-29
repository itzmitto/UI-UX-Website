import {
  type MouseEvent,
  type PointerEvent,
  type WheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Point = {
  x: number;
  y: number;
};

type View = {
  zoom: number;
  pan: Point;
  origin: Point;
};

const minZoom = 1;
const maxZoom = 2.5;
const scrollZoomStep = 0.25;
const minDragRoom = 0.2;
const maxDragRoom = 0.85;
const resetAnimationDuration = 280;

const initialView: View = {
  zoom: 1,
  pan: {
    x: 0,
    y: 0,
  },
  origin: {
    x: 50,
    y: 50,
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function useProductGalleryZoom() {
  const pointersRef = useRef(new Map<number, Point>());

  const hasDraggedRef = useRef(false);

  const viewRef = useRef<View>(initialView);

  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dragRef = useRef({
    pointerId: -1,
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });

  const pinchRef = useRef({
    distance: 0,
    zoom: 1,
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [view, setView] = useState<View>(initialView);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const updateView = (next: Partial<View>) => {
    const newView = {
      ...viewRef.current,
      ...next,
    };

    viewRef.current = newView;

    setView(newView);
  };

  const resetInteraction = () => {
    setIsDragging(false);

    pointersRef.current.clear();

    hasDraggedRef.current = false;

    dragRef.current.pointerId = -1;
  };

  const resetView = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);

      resetTimerRef.current = null;
    }

    viewRef.current = initialView;

    setView(initialView);

    setIsResetting(false);

    resetInteraction();
  };

  const resetViewSmooth = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    const newView: View = {
      ...viewRef.current,
      zoom: minZoom,
      pan: {
        x: 0,
        y: 0,
      },
    };

    viewRef.current = newView;

    setView(newView);

    setIsResetting(true);

    resetInteraction();

    resetTimerRef.current = setTimeout(() => {
      viewRef.current = initialView;

      setView(initialView);

      setIsResetting(false);

      resetTimerRef.current = null;
    }, resetAnimationDuration);
  };

  const getInteractionRect = (element: HTMLButtonElement) =>
    element.parentElement?.getBoundingClientRect() ??
    element.getBoundingClientRect();

  const clampPan = (
    pan: Point,
    zoom: number,
    element: HTMLButtonElement,
  ): Point => {
    const rect = getInteractionRect(element);

    const { origin } = viewRef.current;

    const originX = (origin.x / 100) * rect.width;
    const originY = (origin.y / 100) * rect.height;

    const zoomProgress = (zoom - minZoom) / (maxZoom - minZoom);

    const dragRoom =
      minDragRoom + (maxDragRoom - minDragRoom) * zoomProgress;

    const extraX = rect.width * dragRoom;
    const extraY = rect.height * dragRoom;

    const minX = -(zoom - 1) * (rect.width - originX) - extraX;
    const maxX = (zoom - 1) * originX + extraX;

    const minY = -(zoom - 1) * (rect.height - originY) - extraY;
    const maxY = (zoom - 1) * originY + extraY;

    return {
      x: clamp(pan.x, minX, maxX),
      y: clamp(pan.y, minY, maxY),
    };
  };

  const setZoomOrigin = (
    clientX: number,
    clientY: number,
    element: HTMLButtonElement,
  ) => {
    const rect = getInteractionRect(element);

    const { pan } = viewRef.current;

    updateView({
      origin: {
        x: clamp(
          ((clientX - rect.left - pan.x) / rect.width) * 100,
          0,
          100,
        ),
        y: clamp(
          ((clientY - rect.top - pan.y) / rect.height) * 100,
          0,
          100,
        ),
      },
    });
  };

  const startDrag = (pointerId: number, point: Point) => {
    const { pan } = viewRef.current;

    dragRef.current = {
      pointerId,
      x: point.x,
      y: point.y,
      panX: pan.x,
      panY: pan.y,
    };

    setIsDragging(true);
  };

  const getPinch = () => {
    const [first, second] = Array.from(pointersRef.current.values());

    if (!first || !second) return null;

    return {
      distance: Math.hypot(second.x - first.x, second.y - first.y),
      middle: {
        x: (first.x + second.x) / 2,
        y: (first.y + second.y) / 2,
      },
    };
  };

  const startPinch = (element: HTMLButtonElement) => {
    const pinch = getPinch();

    if (!pinch) return;

    const { zoom, pan } = viewRef.current;

    if (zoom === minZoom) {
      setZoomOrigin(pinch.middle.x, pinch.middle.y, element);
    }

    pinchRef.current = {
      distance: pinch.distance,
      zoom,
      x: pinch.middle.x,
      y: pinch.middle.y,
      panX: pan.x,
      panY: pan.y,
    };

    hasDraggedRef.current = true;

    dragRef.current.pointerId = -1;

    setIsDragging(true);
  };

  const handleImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;

      return;
    }

    const currentZoom = viewRef.current.zoom;

    if (currentZoom >= maxZoom) {
      resetViewSmooth();

      return;
    }

    const nextZoom = currentZoom === minZoom ? 1.75 : maxZoom;

    if (currentZoom === minZoom) {
      setZoomOrigin(event.clientX, event.clientY, event.currentTarget);
    }

    updateView({
      zoom: nextZoom,
      pan: clampPan(viewRef.current.pan, nextZoom, event.currentTarget),
    });
  };

  const handleWheel = (event: WheelEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const currentZoom = viewRef.current.zoom;

    const zoomChange =
      event.deltaY < 0 ? scrollZoomStep : -scrollZoomStep;

    const nextZoom = clamp(
      currentZoom + zoomChange,
      minZoom,
      maxZoom,
    );

    if (nextZoom === minZoom && currentZoom > minZoom) {
      resetViewSmooth();

      return;
    }

    if (currentZoom === minZoom && nextZoom > minZoom) {
      setZoomOrigin(event.clientX, event.clientY, event.currentTarget);
    }

    updateView({
      zoom: nextZoom,
      pan: clampPan(viewRef.current.pan, nextZoom, event.currentTarget),
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const point = {
      x: event.clientX,
      y: event.clientY,
    };

    pointersRef.current.set(event.pointerId, point);

    if (event.pointerType === "touch") {
      if (pointersRef.current.size === 2) {
        event.preventDefault();

        pointersRef.current.forEach((_, pointerId) => {
          try {
            event.currentTarget.setPointerCapture(pointerId);
          } catch {
            return;
          }
        });

        startPinch(event.currentTarget);
      } else if (viewRef.current.zoom > minZoom) {
        event.preventDefault();

        event.currentTarget.setPointerCapture(event.pointerId);

        hasDraggedRef.current = false;

        startDrag(event.pointerId, point);
      }

      return;
    }

    event.preventDefault();

    event.currentTarget.setPointerCapture(event.pointerId);

    hasDraggedRef.current = false;

    startDrag(event.pointerId, point);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;

    pointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointersRef.current.size >= 2) {
      event.preventDefault();

      const pinch = getPinch();

      if (!pinch || !pinchRef.current.distance) return;

      const nextZoom = clamp(
        pinchRef.current.zoom *
          (pinch.distance / pinchRef.current.distance),
        minZoom,
        maxZoom,
      );

      const nextPan =
        nextZoom <= minZoom
          ? viewRef.current.pan
          : {
              x:
                pinchRef.current.panX +
                (pinch.middle.x - pinchRef.current.x),
              y:
                pinchRef.current.panY +
                (pinch.middle.y - pinchRef.current.y),
            };

      updateView({
        zoom: nextZoom,
        pan: clampPan(
          nextPan,
          nextZoom,
          event.currentTarget,
        ),
      });

      hasDraggedRef.current = true;

      return;
    }

    if (dragRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasDraggedRef.current = true;
    }

    const nextPan = {
      x: dragRef.current.panX + deltaX,
      y: dragRef.current.panY + deltaY,
    };

    updateView({
      pan: clampPan(
        nextPan,
        viewRef.current.zoom,
        event.currentTarget,
      ),
    });
  };

  const handlePointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    const wasPinching = pointersRef.current.size >= 2;

    pointersRef.current.delete(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (
      wasPinching &&
      pointersRef.current.size === 1 &&
      viewRef.current.zoom > minZoom
    ) {
      const [pointerId, point] = Array.from(
        pointersRef.current.entries(),
      )[0];

      try {
        event.currentTarget.setPointerCapture(pointerId);
      } catch {
        return;
      }

      startDrag(pointerId, point);

      return;
    }

    if (dragRef.current.pointerId === event.pointerId) {
      dragRef.current.pointerId = -1;
    }

    if (pointersRef.current.size === 0) {
      setIsDragging(false);

      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 0);
    }
  };

  return {
    view,
    isDragging,
    isResetting,
    minZoom,
    maxZoom,
    resetView,
    handleImageClick,
    handleWheel,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnd,
  };
}

export default useProductGalleryZoom;