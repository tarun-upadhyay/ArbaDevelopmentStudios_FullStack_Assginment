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
interface ProductAddModelProp {
  children: React.ReactNode;
  isOpen: any;
  onOpen: any;
  onClose: any;
  title: any;
}
const ProductAddModel: React.FC<ProductAddModelProp> = ({
  children,
  isOpen,
  onOpen,
  onClose,
  title,
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

export default ProductAddModel;
