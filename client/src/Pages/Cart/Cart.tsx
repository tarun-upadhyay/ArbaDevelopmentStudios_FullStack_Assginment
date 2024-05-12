import React from "react";
import Navbar from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard";
import { addToCart, deleteToCart } from "../../Redux/Cart/action";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();

  let { cart } = useSelector((store: any) => store.CartReducer);
  const handleAddToCart = (el: any) => {
    dispatch<any>(addToCart(el));
  };

  const handleDeleteToCart = (el: any) => {
    dispatch<any>(deleteToCart(el));
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="w-[90%] md:w-[87%] lg:w-[84%] mx-auto my-10">
        <h2 className="font-bold text-xl">My cart</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 md:gap-3 gap-1 gap-x-6 mt-4">
          {cart.length > 0 &&
            cart.map((el: any) => (
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
        {cart.length !== 0 && (
          <div className="flex justify-end mt-10 mr-10">
            <button className="flex items-center gap-2 px-8 py-2 bg-[#1ec3cd] text-white mt-1">
              Checkout{" "}
            </button>
          </div>
        )}
        {cart.length === 0 && (
          <div className="flex justify-center items-center">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
              alt="Not found cart item"
              className=""
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
