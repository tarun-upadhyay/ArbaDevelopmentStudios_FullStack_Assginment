import React, { ChangeEvent, FC, useRef, useState } from "react";
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
import LoadingIndicator from "../ui-components/LoadingIndicator";
interface CategoryEditButtonProps {
  id: string;
  title: string;

  image: string;
  price: number;
  description: string;
  category: any;
  categoryArray: any;
}
const ProductEditButton: FC<CategoryEditButtonProps> = ({
  id,
  title,
  category,
  image,
  description,
  price,

  categoryArray,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<{
    title: string;
    categoryArray: any;
    image: string;
    description: string;
    price: number;
    category: string;
  }>({
    title,
    categoryArray,
    category,
    image,
    description,
    price,
  });
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files?.[0];
    if (!file) {
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/v1/product/updateImageProduct/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prevFormData) => ({ ...prevFormData, image: data.image }));
        console.log("File uploaded successfully");
        alert("Updated img succeed, Please refresh table");
      } else {
        alert("Failed to upload");
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleUpdateCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/product/updateNameProduct/${id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Updated Successfull, Please refresh table");

        onClose();
        console.log("Category name updated successfully");
      } else {
        alert("Something went wrong");
        onClose();
        console.error("Failed to update category name");
      }
    } catch (error) {
      console.error("Error updating category name:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="font-bold" onClick={onOpen}>
        Edit |
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? (
            <div>
              <LoadingIndicator />
            </div>
          ) : null}
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <img
              src={formData.image}
              alt="avatar"
              className="h-60 w-60 cursor-pointer"
              onClick={handleFileSelect}
            />
            <label htmlFor="name">
              Name
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                  }));
                }}
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <label htmlFor="description">
              Description
              <input
                id="description"
                name="description"
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                  }));
                }}
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <label htmlFor="price">
              Price
              <input
                id="price"
                name="price"
                type="text"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                  }));
                }}
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </label>
            <label htmlFor="category">
              category
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value,
                  }));
                }}
                className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categoryArray.map((el: any) => (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </label>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="green"
              onClick={handleUpdateCategory}
            >
              Update item
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductEditButton;
