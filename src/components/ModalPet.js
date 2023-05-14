import React, { useContext, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import usePets from "../Hooks/usePets";
import PetContext from "../context/PetContext";
import { Image } from "cloudinary-react";
import { NavLink, useSearchParams } from "react-router-dom";

function ModalPet({ petId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const { getPetInfo } = usePets();
  const { petModalDetails, setPetModalDetails } = useContext(PetContext);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const { petId } = params.get("petId");
    const getPetDetails = async () => {
      const response = await getPetInfo(petId);
      setPetModalDetails(response);
    };
    getPetDetails();
  }, [onOpen]);

  return (
    <Flex w="100%" justifyContent="center">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        w="1000px"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody minH="800px">
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
              mt="10px"
            >
              <ModalHeader
                p="0"
                d="flex"
                w="100%"
                justifyContent="center"
                fontSize="28px"
              >
                Pet Details
              </ModalHeader>
            </Flex>
            <Flex>
              <Image
                cloudName="pets_images"
                publicId={petModalDetails.image}
                alt="pet_image"
                style={{
                  position: "absolut",
                  transform: `translate(-50%,0)`,

                  width: "150px",
                  height: "auto",
                  position: "absolute",
                  left: "50%",
                  top: "0",
                }}
              />
            </Flex>
            <ModalCloseButton />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ModalPet;
