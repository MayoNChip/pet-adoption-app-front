import { Flex, Button, Img } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import userContext from "../context/UserContext";
import smallLogo from "../img/newlogo.png";
import "../css/Navbar.css";
import UseAuth from "../Hooks/useAuth";
import ModalLogin from "./ModalLogin";
import ModalSignup from "./ModalSignup";

import SidebarMenu from "./SidebarMenu";

function Sidebar() {
  const { isLoggedIn } = useContext(userContext);
  const { handleLogout } = UseAuth();
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <Flex
      className="sidebar-master"
      minH="100%"
      // border="blue 1px solid"
      w="100%"
      direction="column"
    >
      <Flex
        className="Logo-flex"
        w="100%"
        h="75px"
        justifyContent="center"
        shadow="md"
        alignItems="center"
      >
        <Img src={smallLogo} alt="Logo" w="50px" mb="10px" />
      </Flex>
      <SidebarMenu />
    </Flex>
  );
}

export default Sidebar;
