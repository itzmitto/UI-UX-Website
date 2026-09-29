import {
  type ComponentType,
  type MouseEventHandler,
  type ReactNode,
  forwardRef,
  useRef,
  useState,
} from "react";

import Thumbnails from "./Thumbnails";

type GalleryWrapperProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type ImageGalleryProps = {
  children: ReactNode[];
  className?: string;
  withThumbnails?: boolean;
  GalleryWrapper?: ComponentType<GalleryWrapperProps>;
  onItemClick?: (index: number) => void;
};

type ItemProps = {
  children: ReactNode;
};

const ImageGallery = forwardRef<HTMLElement, ImageGalleryProps>(
  (
    {
      children,
      className = "",
      withThumbnails = false,
      GalleryWrapper,
      onItemClick,
    },
    ref,
  ) => {
    const carouselContainer = useRef<HTMLUListElement>(null);

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleScroll = () => {
      const container = carouselContainer.current;

      if (!container) return;

      const scrollAmount = container.scrollLeft;
      const slideWidth = container.clientWidth;

      if (!slideWidth) return;

      const current = Math.round(scrollAmount / slideWidth);

      if (current === currentSlide) return;

      setCurrentSlide(current);
    };

    const slideTo = (direction: "left" | "right") => {
      const container = carouselContainer.current;

      if (!container) return;

      const firstElement = container.children[0] as HTMLElement | undefined;

      const scrollAmount = firstElement?.clientWidth ?? container.clientWidth;

      container.scrollTo({
        left:
          container.scrollLeft +
          (direction === "right" ? scrollAmount : -scrollAmount),
        behavior: "smooth",
      });
    };

    const slideToIndex = (index: number) => {
      const container = carouselContainer.current;

      if (!container) return;

      const firstElement = container.children[0] as HTMLElement | undefined;

      const scrollAmount = firstElement?.clientWidth ?? container.clientWidth;

      container.scrollTo({
        left: scrollAmount * index,
        behavior: "smooth",
      });
    };

    return (
      <>
        <figure
          className={`image-gallery ${className}`.trim()}
          ref={ref}
        >
          <div className="image-gallery__navigation">
            <button
              type="button"
              onClick={() => slideTo("left")}
              className="image-gallery__arrow"
              disabled={currentSlide === 0}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              onClick={() => slideTo("right")}
              className="image-gallery__arrow"
              disabled={currentSlide === children.length - 1}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </div>

          <ul
            className="image-gallery__slides"
            onScroll={handleScroll}
            ref={carouselContainer}
          >
            {children.map((child, index) => (
              <ImageGalleryItem key={index}>
                {GalleryWrapper ? (
                  <GalleryWrapper onClick={() => onItemClick?.(index)}>
                    {child}
                  </GalleryWrapper>
                ) : (
                  child
                )}
              </ImageGalleryItem>
            ))}
          </ul>

          <div className="image-gallery__counter">
            {currentSlide + 1}/{children.length}
          </div>
        </figure>

        {withThumbnails && children.length > 1 && (
          <Thumbnails currentSlide={currentSlide} slideToIndex={slideToIndex}>
            {children}
          </Thumbnails>
        )}
      </>
    );
  },
);

function ImageGalleryItem({ children }: ItemProps) {
  return <li className="image-gallery__slide">{children}</li>;
}

function ChevronLeft() {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

ImageGallery.displayName = "ImageGallery";

const CompoundedImageGallery = Object.assign(ImageGallery, {
  Item: ImageGalleryItem,
});

export default CompoundedImageGallery;