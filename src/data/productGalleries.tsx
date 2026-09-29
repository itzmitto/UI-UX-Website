import ProductCarGalleryPreview from "../components/previews/ProductCarGalleryPreview";
import type { UIComponent } from "../types/component";

export const productGalleries: UIComponent[] = [
  {
    id: "supercar-product-image-gallery",
    name: "Supercar Product Image Gallery",
    description:
      "Advanced responsive product gallery with thumbnails, fullscreen viewer, click zoom, wheel zoom, drag panning and touch pinch-to-zoom.",
    category: "Product Galleries",

    preview: <ProductCarGalleryPreview />,

    typescript: `import ProductGallery, {
  type ProductImage,
} from "./productgallery/ProductGallery";

const media: ProductImage[] = [
  {
    label: "Ferrari Testarossa",
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ferrari_Testarossa_001.jpg",
    },
  },
  {
    label: "Lamborghini Diablo",
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/1991_Lamborghini_Diablo_U9.JPG",
    },
  },
  {
    label: "Porsche Carrera GT",
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Porsche_carrera_gt_front.jpg",
    },
  },
  {
    label: "Ultima GTR",
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ultima_GTR_%2851928672313%29.jpg",
    },
  },
];

function SupercarProductGallery() {
  return (
    <div className="w-full max-w-[1008px]">
      <ProductGallery
        media={media}
        withThumbnails
        hasImagePriority
      />
    </div>
  );
}

export default SupercarProductGallery;`,

    tailwind: `w-full
max-w-[1008px]`,

    javascript: `const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const WHEEL_STEP = 0.25;

const clamp = (
  value,
  min,
  max,
) =>
  Math.max(
    min,
    Math.min(
      max,
      value,
    ),
  );

function createGalleryZoom() {
  let view = {
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

  const pointers =
    new Map();

  let drag = {
    pointerId: -1,
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  };

  let pinch = {
    distance: 0,
    zoom: 1,
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  };

  function reset() {
    view = {
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

    pointers.clear();

    drag.pointerId = -1;

    return view;
  }

  function getPinch() {
    const [
      first,
      second,
    ] =
      Array.from(
        pointers.values(),
      );

    if (
      !first ||
      !second
    ) {
      return null;
    }

    return {
      distance:
        Math.hypot(
          second.x -
            first.x,

          second.y -
            first.y,
        ),

      middle: {
        x:
          (first.x +
            second.x) /
          2,

        y:
          (first.y +
            second.y) /
          2,
      },
    };
  }

  function wheel(
    deltaY,
  ) {
    const change =
      deltaY < 0
        ? WHEEL_STEP
        : -WHEEL_STEP;

    view.zoom =
      clamp(
        view.zoom +
          change,

        MIN_ZOOM,
        MAX_ZOOM,
      );

    if (
      view.zoom ===
      MIN_ZOOM
    ) {
      view.pan = {
        x: 0,
        y: 0,
      };
    }

    return view;
  }

  function clickZoom() {
    if (
      view.zoom >=
      MAX_ZOOM
    ) {
      return reset();
    }

    view.zoom =
      view.zoom ===
      MIN_ZOOM
        ? 1.75
        : MAX_ZOOM;

    return view;
  }

  function pointerDown(
    pointerId,
    x,
    y,
  ) {
    pointers.set(
      pointerId,
      {
        x,
        y,
      },
    );

    if (
      pointers.size ===
      2
    ) {
      const currentPinch =
        getPinch();

      if (
        currentPinch
      ) {
        pinch = {
          distance:
            currentPinch.distance,

          zoom:
            view.zoom,

          x:
            currentPinch.middle.x,

          y:
            currentPinch.middle.y,

          panX:
            view.pan.x,

          panY:
            view.pan.y,
        };
      }

      return;
    }

    drag = {
      pointerId,
      x,
      y,

      panX:
        view.pan.x,

      panY:
        view.pan.y,
    };
  }

  function pointerMove(
    pointerId,
    x,
    y,
  ) {
    if (
      !pointers.has(
        pointerId,
      )
    ) {
      return view;
    }

    pointers.set(
      pointerId,
      {
        x,
        y,
      },
    );

    if (
      pointers.size >=
      2
    ) {
      const currentPinch =
        getPinch();

      if (
        !currentPinch ||
        !pinch.distance
      ) {
        return view;
      }

      view.zoom =
        clamp(
          pinch.zoom *
            (
              currentPinch.distance /
              pinch.distance
            ),

          MIN_ZOOM,
          MAX_ZOOM,
        );

      view.pan = {
        x:
          pinch.panX +
          (
            currentPinch.middle.x -
            pinch.x
          ),

        y:
          pinch.panY +
          (
            currentPinch.middle.y -
            pinch.y
          ),
      };

      return view;
    }

    if (
      drag.pointerId !==
      pointerId
    ) {
      return view;
    }

    view.pan = {
      x:
        drag.panX +
        (
          x -
          drag.x
        ),

      y:
        drag.panY +
        (
          y -
          drag.y
        ),
    };

    return view;
  }

  function pointerUp(
    pointerId,
  ) {
    pointers.delete(
      pointerId,
    );

    if (
      drag.pointerId ===
      pointerId
    ) {
      drag.pointerId =
        -1;
    }

    return view;
  }

  function slideIndex(
    scrollLeft,
    width,
  ) {
    if (!width) {
      return 0;
    }

    return Math.round(
      scrollLeft /
        width,
    );
  }

  function slidePosition(
    index,
    width,
  ) {
    return (
      index *
      width
    );
  }

  return {
    getView() {
      return view;
    },

    reset,
    wheel,
    clickZoom,
    pointerDown,
    pointerMove,
    pointerUp,
    slideIndex,
    slidePosition,
  };
}

const gallery =
  createGalleryZoom();

export default gallery;`,
  },
];