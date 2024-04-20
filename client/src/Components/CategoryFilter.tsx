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
interface CategoryFilterProp {
  handleFilterCategory: (url: any) => void;
}
const CategoryFilter: FC<CategoryFilterProp> = ({ handleFilterCategory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ name: "", slug: "" });
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
              Search Name
              <div className="flex relative">
                <input
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Name of Category"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                ></input>
                <FaSearch className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]" />
              </div>
            </label>
            <label htmlFor="" className="relative mt-5">
              Search Slug
              <div className="flex relative">
                <input
                  className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400   disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Name of slug"
                  name="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                ></input>
                <FaSearch className="absolute right-5 h-6 w-6 cursor-pointer text-[#2ab]" />
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

export default CategoryFilter;
