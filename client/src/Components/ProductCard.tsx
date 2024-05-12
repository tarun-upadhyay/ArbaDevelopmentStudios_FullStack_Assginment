import React, { FC } from "react";
interface ProductCardProp {
  key: string;
  description: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  handleAddToCart: () => void;
  handleDeleteToCart: () => void;
}
const ProductCard: FC<ProductCardProp> = ({
  image,
  description,
  title,
  price,
  handleAddToCart,
  quantity,
  handleDeleteToCart,
}) => {
  function lengthShorten(text: string, maxLength: any) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 3) + "...";
  }
  return (
    <div className="relative pb-24 md:p-5 shadow-sm mb-24">
      <div>
        <img src={image} alt="" className="h-40 md:w-80 w-64 lg:w-96" />
      </div>
      <div className="lg:px-5 px-3  py-3 absolute md:top-40 bg-white w-[75%] md:left-7 2xl:left-10 xl:left-8 left-5 top-36 font-bold shadow-2xl">
        <h1>{lengthShorten(title, 20)}</h1>
        <p className="font-semibold">{lengthShorten(description, 20)}</p>
        <p className="text-[#1ec3cd]">Rs.{price}</p>
        {quantity > 0 ? (
          <div className="w-full flex">
            <button
              className="w-full bg-[#1ec3cd] text-white text-2xl font-extrabold"
              onClick={handleDeleteToCart}
            >
              -
            </button>
            <button className="w-full bg-[#1ec3cd] text-white text-2xl font-bold">
              {quantity}
            </button>
            <button
              className="w-full bg-[#1ec3cd] text-white text-2xl font-extrabold"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="bg-[#1ec3cd] w-full text-white mt-1"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
