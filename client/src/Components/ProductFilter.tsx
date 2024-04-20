import React, { ChangeEvent, FC, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
interface ProductFilterProp {
  handleFilterCategory: (url: any) => void;
}
const ProductFilter: FC<ProductFilterProp> = ({ handleFilterCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ title: "", price: "" });
  const handleSearch = () => {
    handleFilterCategory({ ...formData });
    onClose();
  };
  return (
    <>
      {" "}
      <button
        className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
        onClick={onOpen}
      >
        Filter
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Category Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor="" className="relative">
              Search Title
              <div className="flex relative">
                <input
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                ></input>
                <FaSearch className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]" />
              </div>
            </label>
            <label htmlFor="" className="relative mt-5">
              Sort item with price
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="asc"
                  name="price"
                  value="asc"
                  onChange={(e) => setFormData({ ...formData, price: "asc" })}
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="asc">Ascending</label>
                <input
                  type="radio"
                  id="desc"
                  name="price"
                  onChange={(e) => setFormData({ ...formData, price: "desc" })}
                  value="desc"
                  className="h-4 w-4 text-blue-600"
                />
                <label htmlFor="desc">Descending</label>
              </div>
            </label>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleSearch}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductFilter;
