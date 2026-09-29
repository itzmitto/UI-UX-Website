import type { ReactNode } from "react";

type ThumbnailsProps = {
  children: ReactNode[];
  currentSlide: number;
  slideToIndex: (index: number) => void;
};

function Thumbnails({
  children,
  currentSlide,
  slideToIndex,
}: ThumbnailsProps) {
  return (
    <div className="product-thumbnails">
      {children.map((child, index) => {
        const active = currentSlide === index;

        return (
          <button
            key={index}
            type="button"
            className={`product-thumbnails__button ${
              active ? "product-thumbnails__button--active" : ""
            }`}
            onClick={() => slideToIndex(index)}
            aria-label={`Open image ${index + 1}`}
            aria-current={active ? "true" : undefined}
          >
            <figure className="product-thumbnails__image">{child}</figure>
          </button>
        );
      })}
    </div>
  );
}

export default Thumbnails;