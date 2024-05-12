import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { handleTc } from "../Redux/Auth/action";

const TCModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const storeContext = useSelector((store: any) => store.AuthReducer);
  const [cancelled, setCancelled] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const isAccepted = localStorage.getItem("t&CAccepted");
    if (isAccepted === "true" && !cancelled) {
      dispatch<any>(handleTc());
    } else {
      onOpen();
    }
  }, []);

  const handleAccept = () => {
    dispatch<any>(handleTc());
    setCancelled(false);
    onClose();
  };

  const handleCancel = () => {
    onClose();
    setCancelled(true);
  };

  return (
    <>
      {!storeContext.isTermsAccepted && (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            style={{
              borderRadius: "0",
            }}
            maxW="xl"
          >
            <ModalHeader>TERMS & CONDITIONS</ModalHeader>

            <ModalBody>
              <p className="md:px-5 font-bold">
                When a user first signs up, we create 7-8 dummy categories and
                7-8 dummy products for a better user experience. This dummy data
                can be deleted by the user as needed.
              </p>
              <br />
              <p className="md:px-5 font-bold">
                When a user first signs up, we create 7-8 dummy categories and
                7-8 dummy products for a better user experience. This dummy data
                can be deleted by the user as needed.
              </p>
              <br />
              <p className="md:px-5 font-bold">
                When a user first signs up, we create 7-8 dummy categories and
                7-8 dummy products for a better user experience. This dummy data
                can be deleted by the user as needed.
              </p>
              <br />
              <p className="md:px-5 font-bold">
                When a user first signs up, we create 7-8 dummy categories and
                7-8 dummy products for a better user experience. This dummy data
                can be deleted by the user as needed.
              </p>
              <br />
            </ModalBody>

            <Flex
              alignItems={"center"}
              justifyContent={"space-evenly"}
              marginBottom={3}
              p={2}
              mx={3}
              my={5}
              py={5}
            >
              <button
                className="bg-[#1ec3cd] text-white py-2 px-10"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="bg-[#1ec3cd] text-white py-2 px-10"
              >
                Accept
              </button>
            </Flex>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default TCModal;
