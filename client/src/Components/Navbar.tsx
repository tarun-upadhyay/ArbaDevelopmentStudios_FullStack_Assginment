import React, { useEffect } from "react";
import { IoCart } from "react-icons/io5";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, profileInfo } from "../Redux/Auth/action";
const Navbar = () => {
  const dispatch = useDispatch();
  let { cart } = useSelector((store: any) => store.CartReducer);
  const storeContext = useSelector((store: any) => store.AuthReducer);

  useEffect(() => {
    dispatch<any>(profileInfo());
  }, [dispatch]);
  return (
    <div className="flex px-10 m-5 mb-10 justify-between">
      <Link to={"/"}>
        {" "}
        <div className="bg-[#1ec3cd] py-4 px-7 text-white font-bold">Logo</div>
      </Link>
      <div className="flex gap-6">
        <Link to={"/cart"}>
          <div className="relative">
            <IoCart className="text-[#1ec3cd] text-5xl" />
            <span className="absolute top-0 right-0 px-1 rounded-full bg-[#248d7d] text-xs text-white font-bold">
              {cart.length}
            </span>
          </div>
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar
              name={`${storeContext.userDetails.fullName}`}
              src={
                storeContext.userDetails.avatar
                  ? `${storeContext.userDetails.avatar}`
                  : "https://bit.ly/dan-abramov"
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem>
              {" "}
              <Link to={"/my-store"}>My Store</Link>{" "}
            </MenuItem>
            <MenuItem>
              {" "}
              <Link to={"/profile"}>Profile</Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => dispatch<any>(logout())}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
