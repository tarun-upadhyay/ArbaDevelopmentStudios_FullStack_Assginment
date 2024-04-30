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
  name: string;
  slug: string;
  image: string;
  
}
const CategoryEditButton: FC<CategoryEditButtonProps> = ({
  id,
  name,
  slug,
  image,
  
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    image: string;
  }>({ name, slug, image });
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
      const response = await fetch(
        `/api/v1/category/updateCategoryImage/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prevFormData) => ({ ...prevFormData, image: data.image }));
        console.log("File uploaded successfully");
        alert("Updated img succeed");
        window.location.reload()
      } else {
        alert("Failed to upload file");
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
      const response = await fetch(
        `/api/v1/category/updateCategoryName/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Updated Successfull");
        window.location.reload()
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
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
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
            <label htmlFor="slug">
              Slug
              <input
                id="slug"
                name="slug"
                type="text"
                placeholder="Enter Name"
                value={formData.slug}
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

export default CategoryEditButton;
