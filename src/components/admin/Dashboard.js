import { Flex, Heading, MenuItem, Text, chakra, Box } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import PetContext from "../../context/PetContext";
import userContext from "../../context/UserContext";
import usePets from "../../Hooks/usePets";
import useUsers from "../../Hooks/useUsers";
import PetTable from "./PetTable";
import UserTable from "./UserTable";
import helloAdmin from "../../img/dashboardwelcome.png";
import totalPetsBG from "../../img/totalpets.png";
import { useNavigate } from "react-router-dom";
import PetGallery from "./PetGallery";

function Dashboard() {
  const { userData, users, pageTitle, setPageTitle } = useContext(userContext);
  const { pets, setPets } = useContext(PetContext);
  const { getPets } = usePets();
  const { getUsers } = useUsers();
  const navigate = useNavigate();

  const reducer = (accumulator, curr) => accumulator + curr;

  useEffect(() => {
    const getPetsList = async () => {
      const petsList = await getPets();

      const usersList = await getUsers();
    };
    setPageTitle("Dashboard");
    getPetsList();
  }, []);

  return (
    <Flex
      justifyContent="space-around"
      direction="column"
      alignItems="center"
      bgColor="white"
      mt="10px"
    >
      <Flex w="100%">
        <Flex direction="column" w="420px" h="419px" padding="5px">
          <Flex w="100%" h="50%">
            <Flex
              w="98%"
              h="99%"
              padding="5px"
              m="5px"
              borderRadius="10px"
              shadow="md"
              direction="column"
              alignItems="center"
              bgImage={helloAdmin}
              bgSize="150px"
              bgRepeat="no-repeat"
              bgPos="bottom"
            >
              <Flex className="title" justifyContent="space-between" w="220px">
                <Text lineHeight="2" fontSize="28px">
                  Welcome back,
                </Text>
                <Text fontSize="36px" fontWeight="black">
                  {userData?.firstname}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" h="50%">
            <Flex
              m="5px"
              transition="all 0.3s "
              direction="column"
              w="49%"
              h="99%"
              alignItems="center"
              justifyContent="space-evenly"
              padding="5px"
              shadow="md"
              borderRadius="10px"
              position="relative"
            >
              <Flex
                m="5px"
                padding="5px"
                opacity="50%"
                position="absolute"
                w="100%"
                h="100%"
                bgImage={totalPetsBG}
                bgSize="120px"
                bgRepeat="no-repeat"
                bgPos="bottom"
              />
              <Text fontSize="28px">Total Pets</Text>
              <Text fontSize="40px" fontWeight="black">
                {pets.length}
              </Text>
            </Flex>
            <Flex
              direction="column"
              w="50%"
              h="100%"
              alignItems="center"
              justifyContent="space-evenly"
              padding="5px"
              m="5px"
              shadow="md"
              borderRadius="10px"
            >
              <Text fontSize="4xl">Total Users</Text>
              <Text fontSize="5xl" fontWeight="black">
                {users.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="1160px" h="419px" shadow="md">
          <PetGallery></PetGallery>
        </Flex>
      </Flex>
      <Flex>
        <Flex
          m="5px"
          shadow="lg"
          borderRadius="10px"
          h="600px"
          w="790px"
          overflow="hidden"
        >
          <PetTable />
        </Flex>
        <Flex m="5px" shadow="lg" h="600px" w="790px" overflow="auto">
          <UserTable />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
