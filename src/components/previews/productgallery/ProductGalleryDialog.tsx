import {
  useEffect,
  useRef,
  useState,
} from "react";

import GalleryDialog from "./GalleryDialog";
import ImageGallery from "./ImageGallery";
import type { ProductImage } from "./ProductGallery";
import useProductGalleryZoom from "./useProductGalleryZoom";

type ProductGalleryDialogProps = {
  open: boolean;
  media: ProductImage[];
  initialImageIndex: number;
  getShownImage: (
    image: ProductImage,
    index: number,
  ) => string | undefined;
  onClose: (
    index: number,
  ) => void;
};

function ProductGalleryDialog({
  open,
  media,
  initialImageIndex,
  getShownImage,
  onClose,
}: ProductGalleryDialogProps) {
  const dialogGalleryRef =
    useRef<HTMLElement | null>(
      null,
    );

  const [
    selectedImageIndex,
    setSelectedImageIndex,
  ] = useState(
    initialImageIndex,
  );

  const {
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
  } = useProductGalleryZoom();

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedImageIndex(
      initialImageIndex,
    );

    const imagesContainer =
      dialogGalleryRef.current?.querySelector(
        "ul",
      );

    if (!imagesContainer) {
      return;
    }

    requestAnimationFrame(() => {
      imagesContainer.scrollLeft =
        imagesContainer.clientWidth *
        initialImageIndex;
    });

    const handleScroll = () => {
      if (
        !imagesContainer.clientWidth
      ) {
        return;
      }

      setSelectedImageIndex(
        Math.round(
          imagesContainer.scrollLeft /
            imagesContainer.clientWidth,
        ),
      );
    };

    imagesContainer.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      imagesContainer.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, [
    open,
    initialImageIndex,
  ]);

  useEffect(() => {
    resetView();
  }, [selectedImageIndex]);

  const closeDialog = () => {
    resetView();

    onClose(
      selectedImageIndex,
    );
  };

  const slideToIndex = (
    index: number,
  ) => {
    const imagesContainer =
      dialogGalleryRef.current?.querySelector(
        "ul",
      );

    if (!imagesContainer) {
      return;
    }

    resetView();

    imagesContainer.scrollTo({
      left:
        imagesContainer.clientWidth *
        index,
      behavior: "smooth",
    });

    setSelectedImageIndex(
      index,
    );
  };

  return (
    <GalleryDialog
      open={open}
      onClose={closeDialog}
    >
      <div className="product-gallery-dialog__content">
        <div className="product-gallery-dialog__header">
          <button
            type="button"
            onClick={
              closeDialog
            }
            className="product-gallery-dialog__close"
            aria-label="Close gallery"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="product-gallery-dialog__gallery">
          <ImageGallery
            ref={
              dialogGalleryRef
            }
            className="product-gallery-dialog__carousel"
          >
            {media.map(
              (
                image,
                index,
              ) => (
                <div
                  key={`dialog-${image?.sizes?.large}-${index}`}
                  className="product-gallery-dialog__image-wrapper"
                >
                  <img
                    src={
                      getShownImage(
                        image,
                        index,
                      ) ?? ""
                    }
                    width="1008"
                    height="756"
                    alt={
                      image?.label ??
                      ""
                    }
                    draggable={
                      false
                    }
                    className={`product-gallery-dialog__image ${
                      isResetting
                        ? "product-gallery-dialog__image--resetting"
                        : isDragging
                          ? "product-gallery-dialog__image--dragging"
                          : "product-gallery-dialog__image--idle"
                    }`}
                    style={{
                      transform: `translate(${view.pan.x}px, ${view.pan.y}px) scale(${view.zoom})`,
                      transformOrigin: `${view.origin.x}% ${view.origin.y}%`,
                    }}
                  />

                  <button
                    type="button"
                    aria-label={
                      view.zoom >=
                      maxZoom
                        ? "Zoom out"
                        : "Zoom in"
                    }
                    onClick={
                      handleImageClick
                    }
                    onWheel={
                      handleWheel
                    }
                    onPointerDown={
                      handlePointerDown
                    }
                    onPointerMove={
                      handlePointerMove
                    }
                    onPointerUp={
                      handlePointerEnd
                    }
                    onPointerCancel={
                      handlePointerEnd
                    }
                    className={`product-gallery-dialog__zoom ${
                      view.zoom >
                      minZoom
                        ? "product-gallery-dialog__zoom--active"
                        : "product-gallery-dialog__zoom--normal"
                    } ${
                      view.zoom <
                      maxZoom
                        ? "product-gallery-dialog__zoom--in"
                        : "product-gallery-dialog__zoom--out"
                    }`}
                    style={{
                      touchAction:
                        view.zoom >
                        minZoom
                          ? "none"
                          : "pan-x",
                    }}
                  />
                </div>
              ),
            )}
          </ImageGallery>
        </div>

        <div className="product-gallery-dialog__thumbnails">
          {media.map(
            (
              image,
              index,
            ) => (
              <button
                key={`thumbnail-${image?.sizes?.large}-${index}`}
                type="button"
                onClick={() =>
                  slideToIndex(
                    index,
                  )
                }
                className={`product-gallery-dialog__thumbnail ${
                  selectedImageIndex ===
                  index
                    ? "product-gallery-dialog__thumbnail--active"
                    : ""
                }`}
              >
                <img
                  src={
                    getShownImage(
                      image,
                      index,
                    ) ?? ""
                  }
                  width="80"
                  height="64"
                  alt={
                    image?.label ??
                    ""
                  }
                  draggable={
                    false
                  }
                />
              </button>
            ),
          )}
        </div>
      </div>
    </GalleryDialog>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default ProductGalleryDialog;