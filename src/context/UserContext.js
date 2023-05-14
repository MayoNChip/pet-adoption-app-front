import localforage from "localforage";
import React, { useContext, useEffect, useRef, useState } from "react";
// import user from "../../../full-stack-pet-adoption-mayonchip-backend/models/user";
import UseAuth from "../Hooks/useAuth";
import useUsers from "../Hooks/useUsers";
import PetContext from "./PetContext";

export const userContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // const [userDetails, setUserDetails] = useState("");
  const [userData, setUserData] = useState({});
  const { checkIsLoggedIn } = UseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState();
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [userImage, setUserImage] = useState();
  const [newImageDisplay, setNewImageDisplay] = useState();
  const [updatePetStatus, setUpdatePetStatus] = useState();
  const [isOwnedByUser, setIsOwnedByUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(true);
  const openModalButton = useRef(null);
  const [userPets, setUserPets] = useState();
  const [allUserPets, setAllUserPets] = useState();
  const [componentLoading, setComponentLoading] = useState(true);
  const [pageTitle, setPageTitle] = useState("");
  const [petSavedToUser, setPetSavedToUser] = useState(false);
  // const [userPets, setUserFosteredPets] =

  const { setPetDetails, petDetails, isUpdated } = useContext(PetContext);
  // const { isOwnedByUser } = useUsers();

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    const checkLoggedIn = async () => {
      // setIsLoading(true);
      const userRes = await checkIsLoggedIn();
      // const userInfo = await localforage.getItem("userInfo");
      if (userRes?.image !== "") {
        setUserImage(userRes?.image);
      }

      if (userRes) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      // setLoggedIn(true);
      // setUserData(userRes);
      // setIsLoading(false);

      userRes?.permission === 1 ? setIsAdmin(true) : setIsAdmin(false);
      // setLoggedIn(true);
    };
    checkLoggedIn();
    return () => {
      subscription.unsubscribe();
    };
  }, [isLoggedIn, isOwnedByUser, petDetails]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userRes = await checkIsLoggedIn();
        const user = await localforage.getItem("userInfo");
        setUserData(user);
      } catch (error) {
        console.log("no user info", error);
      }
    };
    getUserData();
  }, [isLoggedIn, petDetails, newUserDetails]);

  return (
    <userContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
        userData,
        setUserData,
        isAdmin,
        setIsAdmin,
        isLoading,
        setIsLoading,
        newUserDetails,
        setNewUserDetails,
        userImage,
        setUserImage,
        newImageDisplay,
        setNewImageDisplay,
        updatePetStatus,
        setUpdatePetStatus,
        users,
        setUsers,
        isProfileUpdated,
        setIsProfileUpdated,
        isOwnedByUser,
        setIsOwnedByUser,
        isEdit,
        setIsEdit,
        openModalButton,
        selectedUser,
        setSelectedUser,
        userPets,
        setUserPets,
        allUserPets,
        setAllUserPets,
        componentLoading,
        setComponentLoading,
        pageTitle,
        setPageTitle,
        petSavedToUser,
        setPetSavedToUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default userContext;
