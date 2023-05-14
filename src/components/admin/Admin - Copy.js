import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Tag,
  TagLabel,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import userContext from "../../context/UserContext";
import AddPetModal from "./AddPetModal";

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");
  const { userData } = useContext(userContext);
  const navigate = useNavigate();

  const handleModal = () => {
    onClose();
  };

  const HandleClick = (e) => {
    if (e.target.id === "dashboard") {
      navigate("/dashboard");
      onClose();
    }
    if (e.target.id === "addPet") {
      navigate("/addPet");
      onClose();
    }
  };

  return (
    <Flex>
      <Button colorScheme="cyan" onClick={onOpen}>
        Admin Menu
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Admin Menu</DrawerHeader>
          <DrawerBody>
            <Flex direction="column">
              <Tag
                m="10px 0 50px 0"
                size="lg"
                colorScheme="cyan"
                borderRadius="full"
              >
                <Avatar
                  src="https://bit.ly/sage-adebayo"
                  size="md"
                  name="Segun Adebayo"
                  ml={-1}
                  mr={2}
                />
                <TagLabel>
                  {userData?.firstname + " " + userData?.lastname}
                </TagLabel>
              </Tag>
              <Flex direction="column" h="500px">
                <Button
                  colorScheme="cyan"
                  as="a"
                  id="dashboard"
                  onClick={HandleClick}
                  borderRadius="none"
                  w="100%"
                  // bg="none"
                >
                  Dashboard
                </Button>
                {/* <Button
                  colorScheme="cyan"
                  as="a"
                  id="addPet"
                  onClick={HandleClick}
                  borderRadius="none"
                  w="100%"
                  // bg="none"
                > */}
                <AddPetModal handleModal={handleModal} />
                {/* </Button> */}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Admin;
