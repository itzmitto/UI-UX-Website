import ProductGallery, {
  type ProductImage,
} from "./productgallery/ProductGallery";

const media: ProductImage[] = [
  {
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/061%20-%20Ferrari%20Testarossa%20-%20Flickr%20-%20Price-Photography.jpg",
    },
    label: "Ferrari Testarossa",
  },
  {
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Lamborghini%20Diablo%20SV%201998%201.jpg",
    },
    label: "Lamborghini Diablo",
  },
  {
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/2004%20Porsche%20Carrera%20GT%20DH26.jpg",
    },
    label: "Porsche Carrera GT",
  },
  {
    sizes: {
      large:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Black%20Ultima%20GTR%201.jpg",
    },
    label: "Ultima GTR",
  },
];

function ProductCarGalleryPreview() {
  return (
    <div className="product-gallery-preview">
      <ProductGallery
        media={media}
        recommended={false}
        showSelectedOption={false}
        hasImagePriority
        withThumbnails
      />
    </div>
  );
}

export default ProductCarGalleryPreview;
