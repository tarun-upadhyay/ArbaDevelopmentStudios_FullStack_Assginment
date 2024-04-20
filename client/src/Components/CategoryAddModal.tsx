import React from "react";
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
interface CategoryAddModalProp {
  children: React.ReactNode;
  isOpen: any;
  onOpen: any;
  onClose: any;
  title: any;
  handleAddCategory: any;
}
const CategoryAddModal: React.FC<CategoryAddModalProp> = ({
  children,
  isOpen,
  onOpen,
  onClose,
  title,
  handleAddCategory,
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoryAddModal;
