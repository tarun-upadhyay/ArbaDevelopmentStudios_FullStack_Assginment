import React, { useEffect, useState } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteToCart } from "../Redux/Cart/action";
import ProductCard from "./ProductCard";
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
const ProductComp = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  let { cart } = useSelector((store: any) => store.CartReducer);
  const handleAddToCart = (el: any) => {
    dispatch<any>(addToCart(el));
  };

  const handleDeleteToCart = (el: any) => {
    dispatch<any>(deleteToCart(el));
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/v1/product");
        const data = await response.json();

        //Update products array with quantity value
        const updatedProducts = data.map((product: any) => {
          const cartItem = cart.find((item: any) => item._id === product._id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return { ...product, quantity };
        });

        setProducts(updatedProducts);
      } catch (error: any) {
        throw new Error("error", error);
      }
    })();
  }, [cart]);
  return (
    <div className="w-[80%] mx-auto my-10">
      <h2 className="font-bold text-xl">Products</h2>
      <div className="grid grid-cols-4 gap-6 mb-10">
        {products.length > 0 &&
          products.map((el, i) => (
            <ProductCard
              key={el._id}
              title={el.title}
              description={el.description}
              price={el.price}
              image={el.image}
              quantity={el.quantity}
              handleDeleteToCart={() => handleDeleteToCart(el)}
              handleAddToCart={() => handleAddToCart(el)}
            />
          ))}
      </div>
  
    </div>
  );
};

export default ProductComp;
