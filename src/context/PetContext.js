import React, { useContext, useEffect, useState } from "react";
import usePets from "../Hooks/usePets";
import { toast } from "@chakra-ui/react";
import axios from "axios";
import userContext from "./UserContext";

const PetContext = React.createContext({});

// const PetProvider = PetContext.Provider;

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [isSelected, setIsSelected] = useState("mypets");
  const [isLoading, setIsLoading] = useState(false);
  const [petDetails, setPetDetails] = useState({});
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(userContext);
  const [petBreedsList, setPetBreedsList] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [petType, setPetType] = useState();
  const [petsList, setPetsList] = useState();
  const { getPets } = usePets();

  useEffect(() => {
    const getAllPets = async () => {
      try {
        const allPets = await getPets();
        setPetsList(allPets);
      } catch (error) {
        console.log("cant get all pets ==>", error);
      }
    };
    getAllPets();
  }, [isLoggedIn]);

  return (
    <PetContext.Provider
      value={{
        pets,
        setPets,
        isSelected,
        setIsSelected,
        petDetails,
        setPetDetails,
        isUpdated,
        setIsUpdated,
        petBreedsList,
        setPetBreedsList,
        isLoading,
        setIsLoading,
        userData,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContext;
