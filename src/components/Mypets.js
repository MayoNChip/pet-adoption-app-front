import { Button, Divider, Flex, Spinner } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";

import PetContext from "../context/PetContext";

import useUsers from "../Hooks/useUsers";
import PetList from "./PetList";

function Mypets() {
  const { isLoading, setIsLoading } = useContext(PetContext);
  const selection = useRef(null);
  const [isSelected, setIsSelected] = useState("mypets");
  const { getMyPets } = useUsers();

  useEffect(() => {
    setIsSelected("mypets");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getUserPets = async () => {
      const getUserPetsRes = await getMyPets(isSelected);
      setIsLoading(false);
    };
    getUserPets();
  }, [isSelected]);

  const selectedStyle = {
    borderBottom: "2px solid #4BBAED",
  };

  const setActive = (e) => {
    if (e.target.id === "mypets") {
      setIsSelected(e.target.id);
    } else if (e.target.id === "savedpets") {
      setIsSelected(e.target.id);
    }
  };

  return (
    <Flex direction="column" w="100%">
      <Flex justifyContent="center">
        <Flex mt="50px">
          <Button
            fontSize="18px"
            w="150px"
            id="mypets"
            ref={selection}
            style={
              isSelected === "mypets"
                ? selectedStyle
                : { backgroundColor: "transparent" }
            }
            borderRadius="0"
            bg="none"
            _hover={{
              bgColor: "none",
              borderBottom: "lightblue 2px solid",
            }}
            _focus="none"
            _active={{ backgroundColor: "#dbf4ff" }}
            onClick={setActive}
          >
            My Pets
          </Button>
          <Button
            fontSize="18px"
            w="150px"
            ref={selection}
            style={
              isSelected === "savedpets"
                ? selectedStyle
                : { backgroundColor: "transparent " }
            }
            id="savedpets"
            bg="none"
            borderRadius="0"
            _hover={{
              bgColor: "none",
              borderBottom: "lightblue 2px solid",
            }}
            _focus="none"
            onClick={setActive}
            _active={{ backgroundColor: "#dbf4ff" }}
          >
            Saved Pets
          </Button>
        </Flex>
      </Flex>
      <Divider
        backgroundColor="#dbf4ff"
        m="10px 0"
        w="95%"
        alignSelf="center"
      />
      {isLoading ? (
        <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
          <Spinner color="cyan.600" size="xl" m="auto auto"></Spinner>
        </Flex>
      ) : (
        <PetList />
      )}
    </Flex>
  );
}

export default Mypets;
