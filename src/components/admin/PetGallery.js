import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import PetContext from "../../context/PetContext";
import usePets from "../../Hooks/usePets";

function PetGallery() {
  const { getPets } = usePets();
  const { pets } = useContext(PetContext);

  useEffect(() => {
    const getPetsImages = async () => {
      const pets = await getPets();
    };
    getPetsImages();
  }, []);
  return (
    <Flex w="100%" h="100%">
      <Flex
        p="20px"
        alignItems="center"
        overflow="auto"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {pets &&
          pets.map((pet) => {
            return (
              <Flex w="250px" m="0 10px" direction="column" alignItems="center">
                <Avatar
                  src={pet.image}
                  boxSize="150px"
                  alt="pet iamge"
                ></Avatar>
                <Text fontSize="28px" fontWeight="black">
                  {pet.name}
                </Text>
              </Flex>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default PetGallery;
