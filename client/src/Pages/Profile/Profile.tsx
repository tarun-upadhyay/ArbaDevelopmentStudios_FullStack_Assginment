import React, { useRef, ChangeEvent, useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import TCModal from "../../ui-components/TCModal";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../../ui-components/LoadingIndicator";
import { deleteTC, profileInfo } from "../../Redux/Auth/action";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Button, IconButton } from "@material-tailwind/react";
const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const storeContext = useSelector((store: any) => store.AuthReducer);
  const dispatch = useDispatch();
  const [isProfilePassword, setProfilePassword] = useState(false);
  const [fullName, setFullName] = useState(storeContext.userDetails.fullName);
  const [passwordNew, setPetpasswordNew] = useState("");
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  useEffect(() => {
    const isAccepted = localStorage.getItem("t&CAccepted");

    setTerms(isAccepted ? true : false);
  }, [setTerms]);
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
      const response = await fetch("/api/v1/auth/updateImage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully");
        dispatch<any>(profileInfo());
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

  function handleSubmitUpdate() {
    if (fullName.length < 2) {
      alert("Name length should be greater than 2");
    } else {
      setLoading(true);
      fetch("/api/v1/auth/updateName", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update name");
          }
          dispatch<any>(profileInfo());
          setLoading(false);
          onClose();
          console.log("Name updated successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating name:", error);
        });
    }
  }
  function handleSubmitPassword() {
    if (passwordNew.length < 5) {
      alert("Password length should be greater than 6");
    } else {
      setLoading(true);
      fetch("/api/v1/auth/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: passwordNew }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update password");
          }
          alert("Password updated successfully");

          setLoading(false);
          setProfilePassword(false);
          console.log("Name updated successfully");
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating name:", error);
        });
      setProfilePassword(false);
    }
  }
  return (
    <div>
      <Navbar />

      <div className="w-[40%] mx-auto ">
        {!storeContext.isTermsAccepted && <TCModal></TCModal>}
        <div className="flex flex-col items-center justify-center">
          {loading && (
            <div className="relative bottom-56">
              <LoadingIndicator />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <img
            src={storeContext.userDetails.avatar}
            alt="avatar"
            className="h-48 w-64 cursor-pointer"
            onClick={handleFileSelect}
          />
          <h3 className="text-xl font-semibold">
            {" "}
            {storeContext.userDetails.fullName}
          </h3>
          <p> {storeContext.userDetails.email}</p>
          <button
            className="px-8 py-2 bg-[#1ec3cd] text-white mt-1 font-bold"
            onClick={onOpen}
          >
            Update profile
          </button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <label htmlFor="">
                  Full Name
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="flex h-10 w-full outline-none border-b-2 border-[#2ab2ce] bg-transparent text-lg placeholder:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>
                <button
                  className="px-8 py-2 bg-[#1ec3cd] text-white mt-5 font-bold"
                  onClick={handleSubmitUpdate}
                >
                  Update
                </button>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
        <hr className="border-2 font-bold mt-6 text-black" />
        <div className="flex justify-center gap-4">
          <button
            className="px-8 py-2 bg-[#1ec3cd] text-white mt-5 font-bold"
            onClick={() => {
              dispatch<any>(deleteTC());
              return window.location.reload();
            }}
          >
            See T&C
          </button>
          <button
            className="px-8 py-2 bg-[#1ec3cd] text-white mt-5 font-bold"
            onClick={() => setProfilePassword(!isProfilePassword)}
          >
            Change Password
          </button>
        </div>
        {/* Password Model */}
        <Modal
          isOpen={isProfilePassword}
          onClose={() => setProfilePassword(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Profile</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl mt={4}>
                <FormLabel>New Password</FormLabel>
                <input
                  style={{
                    borderBottom: "2px solid #1ec3cd",
                    padding: "10px",
                    outline: "none",
                  }}
                  type="text"
                  value={passwordNew}
                  onChange={(e) => setPetpasswordNew(e.target.value)}
                  placeholder={"Enter Password"}
                />
              </FormControl>
              <button
                className="px-8 py-2 bg-[#1ec3cd] text-white mt-5 font-bold"
                onClick={handleSubmitPassword}
              >
                Update Password
              </button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
