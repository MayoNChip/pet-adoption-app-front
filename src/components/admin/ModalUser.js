import React, { useContext, useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Text,
  AvatarBadge,
  Avatar,
  IconButton,
  Heading,
  Spinner,
  Divider,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  Image,
  Stack,
  Tag,
} from "@chakra-ui/react";
import bulletDog from "../../img/bulletdog.png";
import { Formik, Form, Field, setNestedObjectValues } from "formik";
import useAuth from "../../Hooks/useAuth";
import userContext from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";
import { EditIcon } from "@chakra-ui/icons";
import PetContext from "../../context/PetContext";

function ModalUser() {
  const { userId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isLoggedIn,
    selectedUser,
    componentLoading,
    setComponentLoading,
    userPets,
  } = useContext(userContext);
  const { getUserInfo, getUserPets } = useUsers();
  const { pets } = useContext(PetContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      onOpen();
    }
  }, [userId, isLoggedIn, selectedUser]);

  useEffect(() => {
    setComponentLoading(true);
    const getUserDetails = async () => {
      const getUserInfoRes = await getUserInfo(userId);
      setComponentLoading(false);
      const usersPets = await getUserPets(userId);
    };
    getUserDetails();
  }, [onOpen]);

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Flex alignItems="center" direction="column">
      <Modal
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalBody>
            {componentLoading ? (
              <Flex
                w="100%"
                minH="400px"
                alignItems="center"
                justifyContent="center"
                top="50%"
                left="50%"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <>
                <Flex
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
                  bgColor="white"
                  mt="30px"
                >
                  <Flex direction="column" alignItems="center">
                    <Flex direction="column" alignItems="center">
                      {componentLoading ? (
                        <Spinner size="xl" />
                      ) : (
                        <Avatar
                          size="2xl"
                          src={selectedUser?.image}
                          alt="profile_picture"
                          m="20px"
                        ></Avatar>
                      )}

                      <Heading alignSelf="center" mb="10px">
                        {selectedUser?.firstname + " " + selectedUser?.lastname}
                      </Heading>

                      <Button
                        as="a"
                        w="150px"
                        colorScheme="red"
                        color="cyan.50"
                        onClick={handleCancel}
                        mb="10px"
                      >
                        Close
                      </Button>
                    </Flex>
                    <Flex direction="column" w="100%" h="100%">
                      <Flex
                        mt="10px"
                        direction="column"
                        className="user_details"
                        justifyContent="space-between"
                        h="300px"
                      >
                        <Flex direction="column" alignItems="center">
                          <Text fontSize="md">First Name</Text>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {selectedUser?.firstname}
                            </Text>
                          </Box>
                        </Flex>
                        <Flex direction="column" alignItems="center">
                          <Text fontSize="md">Last Name</Text>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {selectedUser?.lastname}
                            </Text>
                          </Box>
                        </Flex>

                        <Flex direction="column" alignItems="center">
                          <Text fontSize="md">Email</Text>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {selectedUser?.email}
                            </Text>
                          </Box>
                        </Flex>
                        {/* <Heading> */}
                        <Flex direction="column" alignItems="center">
                          <Text fontSize="md">Phone Number</Text>
                          <Box>
                            <Text fontSize="2xl" fontWeight="bold">
                              {selectedUser?.phonenumber}
                            </Text>
                          </Box>
                        </Flex>
                        <Divider />
                        <Flex direction="column">
                          <Text fontSize="2xl" fontWeight="black">
                            {selectedUser?.firstname}'s Pets:
                          </Text>

                          {userPets && <UserPets />}
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
    // </Flex>
  );
}

const UserPets = () => {
  const { componentLoading, userPets } = useContext(userContext);
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem minW="400px">
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Adopted Pets
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Flex justifyContent="space-between" borderBottom="1px black solid">
            <Text fontSize="xl" fontWeight="black">
              Pet picture
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Name
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Type
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Age
            </Text>
          </Flex>
          {userPets &&
            userPets.adoptedPets.map((pet) => {
              return (
                <>
                  <Flex
                    alignItems="center"
                    textAlign="left"
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Flex>
                      <Avatar
                        src={pet.image}
                        alt="pet image"
                        mt="10px"
                        size="sm"
                      ></Avatar>
                    </Flex>
                    <Flex>
                      <Text mt="10px" fontSize="2xl" fontWeight="black">
                        {pet.name}
                      </Text>
                    </Flex>
                    <Flex>
                      <Tag
                        mt="10px"
                        fontSize="xl"
                        colorScheme={pet.petType === "dog" ? "cyan" : "red"}
                      >
                        {pet.petType}
                      </Tag>
                    </Flex>
                    <Flex>
                      <Text mt="10px" fontSize="2xl" fontWeight="black">
                        {pet.age}
                      </Text>
                    </Flex>
                  </Flex>
                  <Divider mt="10px" />
                </>
              );
            })}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Fostered Pets
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Flex justifyContent="space-between" borderBottom="1px black solid">
            <Text fontSize="xl" fontWeight="black">
              Pet picture
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Name
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Type
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Age
            </Text>
          </Flex>
          {userPets &&
            userPets.fosteredPets.map((pet) => {
              return (
                <>
                  <Flex justifyContent="space-between">
                    <Avatar
                      src={pet.image}
                      alt="pet image"
                      mt="10px"
                      size="sm"
                    ></Avatar>
                    <Text mt="10px" fontSize="2xl" fontWeight="black">
                      {pet.name}
                    </Text>
                    <Tag
                      mt="10px"
                      fontSize="xl"
                      colorScheme={pet.petType === "dog" ? "cyan" : "red"}
                    >
                      {pet.petType}
                    </Tag>
                    <Text mt="10px" fontSize="2xl" fontWeight="black">
                      {pet.age}
                    </Text>
                  </Flex>
                  <Divider mt="10px" />
                </>
              );
            })}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Saved Pets
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Flex justifyContent="space-between" borderBottom="1px black solid">
            <Text fontSize="xl" fontWeight="black">
              Pet picture
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Name
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Type
            </Text>
            <Text fontSize="xl" fontWeight="black">
              Pet Age
            </Text>
          </Flex>
          {userPets &&
            userPets.savedPets.map((pet) => {
              return (
                <>
                  <Flex
                    alignItems="center"
                    textAlign="left"
                    w="100%"
                    justifyContent="space-between"
                  >
                    <Avatar
                      src={pet.image}
                      alt="pet image"
                      mt="10px"
                      size="sm"
                    ></Avatar>
                    <Text mt="10px" fontSize="2xl" fontWeight="black">
                      {pet.name}
                    </Text>
                    <Tag
                      mt="10px"
                      fontSize="xl"
                      colorScheme={pet.petType === "dog" ? "cyan" : "red"}
                    >
                      {pet.petType}
                    </Tag>
                    <Text mt="10px" fontSize="2xl" fontWeight="black">
                      {pet.age}
                    </Text>
                  </Flex>
                  <Divider mt="10px" />
                </>
              );
            })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ModalUser;
