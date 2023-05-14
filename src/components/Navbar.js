import {
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Avatar,
  Divider,
  Link,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";
import "../css/Navbar.css";
import userContext from "../context/UserContext";
import UseAuth from "../Hooks/useAuth";
import { BsFillCaretDownFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { userData, isLoggedIn, isAdmin, pageTitle } = useContext(userContext);
  const { handleLogout } = UseAuth();

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Flex w="100%" bgColor="white" h="69px">
      <Flex
        className="auth-buttons"
        justifyContent="right"
        alignItems="center"
        width="100%"
        h="72px"
        shadow="base"
        zIndex="2"
      >
        {isAdmin ? (
          <Menu isLazy>
            <MenuButton size="sm">
              <Flex alignItems="center" mr="10px">
                <Avatar src={userData?.image} alt="profile-pic" mr="10px" />
                <Flex direction="column" alignItems="flex-start">
                  <Text fontWeight="bold">
                    {userData?.firstname} {userData?.lastname}
                  </Text>
                  {isAdmin && <Text>Admin</Text>}
                </Flex>
                <Icon as={BsFillCaretDownFill} ml="10px" />
              </Flex>
            </MenuButton>
            <MenuList>
              <Text ml="10px" fontWeight="black">
                Admin Menu
              </Text>
              <Divider />
              {/* {isAdmin && ( */}
              <NavLink to="/dashboard">
                <MenuItem
                  w="100%"
                  bgColor="white"
                  _hover={{
                    backgroundColor: "cyan.500",
                    color: "white",
                  }}
                >
                  Dashboard
                </MenuItem>
              </NavLink>
              <NavLink to="/addpet">
                <MenuItem
                  w="100%"
                  bgColor="white"
                  _hover={{
                    backgroundColor: "cyan.500",
                    color: "white",
                  }}
                >
                  Add a Pet
                </MenuItem>
              </NavLink>
              <MenuItem
                w="100%"
                bgColor="white"
                _hover={{
                  backgroundColor: "cyan.500",
                  color: "white",
                }}
                onClick={handleLogoutClick}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Flex>
            {isLoggedIn && userData ? (
              <Flex alignItems="center">
                <Flex alignItems="center">
                  <Avatar src={userData.image} alt="profile-pic" mr="10px" />
                  <Flex direction="column">
                    <Flex alignItems="flex-start">
                      <Text fontWeight="bold">
                        {userData?.firstname} {userData?.lastname}
                      </Text>
                    </Flex>
                    <Link
                      onClick={() => {
                        navigate(`/profilesettings`);
                      }}
                    >
                      View profile
                    </Link>
                  </Flex>
                  <Button
                    m="0 10px"
                    bgColor="white"
                    _hover={{
                      backgroundColor: "red.500",
                      color: "white",
                    }}
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex w="150px" justifyContent="space-between">
                <ModalLogin /> <ModalSignup />
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
