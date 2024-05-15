import React, { FC, useEffect, useState } from "react";

import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteToCart } from "../Redux/Cart/action";
import ProductCard from "./ProductCard";
import { ColorRing } from "react-loader-spinner";
import CardLoadingSkeleton from "../ui-components/CardLoadingSkeleton ";
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}
interface PRODUCTCOMPINTERFACT {
  limit: number;
}
const ProductComp: FC<PRODUCTCOMPINTERFACT> = ({ limit }) => {
  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let { cart } = useSelector((store: any) => store.CartReducer);

  const handleAddToCart = (el: any) => {
    dispatch<any>(addToCart(el));
  };

  const handleDeleteToCart = (el: any) => {
    dispatch<any>(deleteToCart(el));
  };
  useEffect(() => {
    const updatedProducts = products.map((product) => {
      const cartItem = cart.find((item: any) => item._id === product._id);
      const quantity = cartItem ? cartItem.quantity : 0;
      return { ...product, quantity };
    });
    setProducts(updatedProducts);
  }, [cart]);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/v1/product?limit=${limit}`);
        const data = await response.json();

        const updatedProducts = data.map((product: any) => {
          const cartItem = cart.find((item: any) => item._id === product._id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return { ...product, quantity };
        });

        setProducts(updatedProducts);
        setDataFetched(true);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error(error);
      }
    };

    if (!dataFetched) {
      fetchProducts();
    }
  }, []);
  if (loading) {
    return (
      <div className="w-[90%] md:w-[87%] lg:w-[84%] mx-auto my-10">
        <h2 className="font-bold text-xl">Products</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardLoadingSkeleton />
          <CardLoadingSkeleton />
          <CardLoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[87%] lg:w-[84%] mx-auto my-10">
      <h2 className="font-bold text-xl">Products</h2>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-3 gap-1 gap-x-6 mt-4">
          {products.map((el) => (
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
      ) : (
        <div className="bg-yellow-400 text-xl flex justify-center items-center w-full md:w-[50%] mx-auto rounded-xl p-2 my-5">
          <h1 className="text-xl leading-8">No product had been stored yet</h1>
        </div>
      )}
    </div>
  );
};

export default ProductComp;
