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
              <p className="px-5 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fuga eaque dolore alias pariatur doloribus adipisci,
                eveniet illum, consequatur nostrum neque repellendus commodi
                incidunt porro esse itaque sint magnam magni deleniti reiciendis
                sunt?
              </p>
              <br />
              <p className="px-5 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fuga eaque doendus commodi incidunt porro esse itaque
                sint magnam magni deleniti reiciendis sunt?
              </p>
              <br />
              <p className="px-5 font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed rem
                optio, fugepellendus commodi incidunt porro esse itaque sint
                magnam magni deleniti reiciendis sunt?
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
