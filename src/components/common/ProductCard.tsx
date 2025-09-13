import React from "react";
import { Product } from "@/types/product";
import ProductCartActions from "./ProductCartActions";
import { getImageUrl } from "@/utils/getImageUrl";
const notFoundImage = "/assets/images/products/no-image.jpg";
const redRibbon = "/assets/images/badge-red-img.jpeg";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Ensure discount is always a number
  const discount = typeof product.discount === "number" ? product.discount : 0;
  // Use getImageUrl for images, fallback to notFoundImage
  const imageUrl =
    product.images && product.images[0]
      ? getImageUrl(product.images[0])
      : notFoundImage;

  return (
    <div className="card product-card bg-white shadow-lg rounded-lg overflow-hidden h-[400px]">
      <div className="relative">
        {discount > 0 && (
          <div
            className="text-center text-white absolute right-[5px] top-[-5px] w-[65px] h-[60px] p-[15px_12px] bg-no-repeat bg-center bg-cover text-[12px] z-50 font-bold leading-[1.2]"
            style={{ backgroundImage: `url(${redRibbon})` }}
          >
            {discount.toFixed(0)} tk Off
          </div>
        )}
        <img
          src={imageUrl as string}
          alt="Product"
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
            {typeof product.unitType === "object" &&
            product.unitType?.shortform === "pc"
              ? "Piece"
              : "KG"}
          </span>
        </div>
        <h3
          onClick={() => {
            /* handle product click if needed */
          }}
          className="card-title text-textColor hover:text-themeColor text-base font-bold mt-2 min-h-[48px] line-clamp-2 leading-6 cursor-pointer"
        >
          {product.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </h3>
        {discount > 0 ? (
          <div className="flex justify-start gap-3 items-center pt-2">
            <div className="price text-themeColor text-lg font-bold leading-normal">
              Tk. {(product.price.sell - discount).toFixed(2)}
            </div>
            <del className="text-gray-400 text-sm leading-normal">
              Tk. {product.price.sell.toFixed(2)}
            </del>
          </div>
        ) : (
          <div className="flex justify-start gap-2 items-center pt-2">
            <div className="price text-themeColor text-lg font-bold leading-normal">
              Tk. {product.price.sell.toFixed(2)}
            </div>
          </div>
        )}
        {/* Ensure discount is always a number for ProductCartActions */}
        <ProductCartActions product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
