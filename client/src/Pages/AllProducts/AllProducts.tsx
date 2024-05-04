import React from "react";
import Navbar from "../../Components/Navbar";
import TCModal from "../../ui-components/TCModal";
import ProductComp from "../../Components/ProductComp";

const AllProducts = () => {
  return (
    <>
      <Navbar />
      <TCModal />
      <ProductComp limit={20} />
    </>
  );
};

export default AllProducts;
