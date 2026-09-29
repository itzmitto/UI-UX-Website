import {
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import ImageGallery from "./ImageGallery";
import ProductGalleryDialog from "./ProductGalleryDialog";
import "./ProductGallery.css";

export type ProductImage = {
  sizes?: {
    large?: string;
  };
  label?: string;
};

type ProductGalleryProps = {
  media: ProductImage[];
  recommended?: boolean;
  showSelectedOption?: boolean;
  hasImagePriority?: boolean;
  withThumbnails?: boolean;
  className?: string;
};

function ProductGallery({
  media,
  recommended = false,
  showSelectedOption = false,
  hasImagePriority = false,
  withThumbnails = false,
  className = "",
}: ProductGalleryProps) {
  const imageGalleryRef =
    useRef<HTMLElement | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [
    dialogImageIndex,
    setDialogImageIndex,
  ] = useState(0);

  const getShownImage = (
    image: ProductImage,
    index: number,
  ) => {
    if (
      index === 0 &&
      showSelectedOption
    ) {
      return image?.sizes?.large;
    }

    return image?.sizes?.large;
  };

  useEffect(() => {
    const imagesContainer =
      imageGalleryRef.current?.querySelector(
        "ul",
      );

    if (
      imagesContainer?.scrollLeft
    ) {
      imagesContainer.scrollLeft = 0;
    }
  }, [media]);

  const openImageDialog = (
    index: number,
  ) => {
    setDialogImageIndex(index);
    setDialogOpen(true);
  };

  const closeImageDialog = (
    index: number,
  ) => {
    const imagesContainer =
      imageGalleryRef.current?.querySelector(
        "ul",
      );

    if (imagesContainer) {
      imagesContainer.scrollLeft =
        imagesContainer.clientWidth *
        index;
    }

    setDialogImageIndex(index);
    setDialogOpen(false);
  };

  return (
    <>
      <ImageGallery
        ref={imageGalleryRef}
        className={[
          className,
          recommended
            ? "product-gallery--recommended"
            : "product-gallery--normal",
        ]
          .filter(Boolean)
          .join(" ")}
        withThumbnails={
          withThumbnails
        }
        GalleryWrapper={
          ProductGalleryWrapper
        }
        onItemClick={
          openImageDialog
        }
      >
        {media.map(
          (image, index) => (
            <img
              key={`${image?.sizes?.large}-${index}`}
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
              className="product-gallery__image"
              loading={
                index === 0 &&
                hasImagePriority
                  ? "eager"
                  : "lazy"
              }
              fetchPriority={
                index === 0 &&
                hasImagePriority
                  ? "high"
                  : "auto"
              }
              draggable={false}
            />
          ),
        )}
      </ImageGallery>

      <ProductGalleryDialog
        open={dialogOpen}
        media={media}
        initialImageIndex={
          dialogImageIndex
        }
        getShownImage={
          getShownImage
        }
        onClose={
          closeImageDialog
        }
      />
    </>
  );
}

type ProductGalleryWrapperType = {
  children:
    | ReactNode
    | ReactNode[];
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function ProductGalleryWrapper({
  children,
  onClick,
}: ProductGalleryWrapperType) {
  return (
    <button
      type="button"
      className="product-gallery__wrapper"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ProductGallery;