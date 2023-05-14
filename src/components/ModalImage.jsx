import { Avatar,Flex ,Image, Modal, ModalBody,  ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import PetContext from '../context/PetContext';


function ModalImage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {petDetails} = useContext(PetContext)

  return (
<>
    <Avatar
    size="2xl"
    src={petDetails.image}
    alt="profile_picture"
    onClick={onOpen}
  />

    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
    <ModalOverlay  />
    <ModalContent>
      <ModalBody>
          <Flex >

        <Image src={petDetails.image}></Image>
          </Flex>
      </ModalBody>
    </ModalContent>
    </Modal>
    </>
  )
}

export default ModalImage
