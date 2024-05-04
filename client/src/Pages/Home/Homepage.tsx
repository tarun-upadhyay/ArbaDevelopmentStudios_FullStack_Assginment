import React, { useEffect, useState } from "react";
import HomepageCarousel from "../../ui-components/HomepageCarousel";
import TCModal from "../../ui-components/TCModal";
import Navbar from "../../Components/Navbar";
import ProductComp from "../../Components/ProductComp";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <HomepageCarousel />
      <TCModal />
      <ProductComp limit={8} />
      <div className="flex justify-end mt-10 mr-10">
        <Link to={"/all-products"}>
          <button className="flex items-center gap-2 px-8 py-2 bg-[#1ec3cd] text-white mt-1">
            All Products{" "}
            <span className="flex ">
              <MdOutlineKeyboardArrowRight />
              <MdOutlineKeyboardArrowRight />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
