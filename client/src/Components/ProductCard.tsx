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
  return (
    <div className="relative pb-24 p-5">
      <div>
        <img src={image} alt="" className="h-40 w-96" />
      </div>
      <div className="px-5 py-3 absolute top-40 bg-white w-[75%] left-9 font-bold shadow-2xl">
        <h1>{title}</h1>
        <p className="font-semibold">{description}</p>
        <p className="text-[#1ec3cd]">Rs.{price}</p>
        {quantity > 0 ? (
          <div className="w-full flex">
            <button
              className="w-full bg-[#1ec3cd] text-white"
              onClick={handleDeleteToCart}
            >
              -
            </button>
            <button className="w-full bg-[#1ec3cd] text-white">
              {quantity}
            </button>
            <button
              className="w-full bg-[#1ec3cd] text-white"
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
