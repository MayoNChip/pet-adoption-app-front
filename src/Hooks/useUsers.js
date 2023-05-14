import { createBreakpoints } from "@chakra-ui/theme-tools";
import axios from "axios";
import localforage from "localforage";
import { useContext } from "react";
import PetContext from "../context/PetContext";
import userContext from "../context/UserContext";
import CustomToast from "../utils/CustomToast";

const baseURL = process.env.BACKEND_BASE_URL || "http://16.16.162.111:4000";

function useUsers() {
	const {
		setUsers,
		setIsOwnedByUser,
		userData,
		setSelectedUser,
		setAllUserPets,
		setUserData,
		setUserPets,
		setPetSavedToUser,
	} = useContext(userContext);
	const { setPets } = useContext(PetContext);
	const { successToast, errorToast } = CustomToast();

	const getUsers = async () => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const usersList = await axios.get(`${baseURL}/users/`, {
				headers: Headers,
			});
			if (usersList) {
				setUsers(usersList.data);
				return usersList.data;
			}
		} catch (err) {
			console.log("could not get users with error", err);
		}
	};

	const isOwner = async (petId) => {
		const isAdopted = userData?.adoptedPets?.map((i) => i === petId);
		const isFostered = userData?.fosteredPets?.map((i) => i === petId);
		const isSaved = userData?.savedPets?.map((i) => i === petId);

		// let userPets = [];
		console.log(isAdopted);
		if (isAdopted) {
			const newArray = isAdopted?.filter((petId) => petId);
			if (newArray?.length !== 0) {
				await setIsOwnedByUser({ adopted: true });
			} else {
				await setIsOwnedByUser({ adotped: false });
			}
		}
		if (isFostered) {
			const newArray = isFostered?.filter((petId) => petId);
			if (newArray.length !== 0) {
				await setIsOwnedByUser((cur) => ({ ...cur, fostered: true }));
			} else {
				await setIsOwnedByUser((cur) => ({ ...cur, fostered: false }));
			}
		}
		if (isSaved) {
			const newArray = isSaved?.filter((petId) => petId);
			if (newArray.length !== 0) {
				await setIsOwnedByUser((cur) => ({ ...cur, saved: true }));
			} else {
				await setIsOwnedByUser((cur) => ({ ...cur, saved: false }));
			}
		}
	};

	const getUserInfo = async (userId) => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const userRes = await axios.get(`${baseURL}/users/${userId}`, {
				headers: Headers,
			});
			setSelectedUser(userRes.data.data);
			return userRes.data.data;
		} catch (error) {
			console.error("get user by Id useUsers ERROR", error);
		}
	};

	const getMyPets = async (selected) => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const petsResponse = await axios.get(`${baseURL}/users/mypets`, {
				headers: Headers,
			});
			if (!petsResponse?.data.success) {
				return { success: false, msg: "No pets found" };
			}
			selected === "mypets"
				? setPets(petsResponse.data.data.adoptedFosteredPets)
				: setPets(petsResponse.data.data.savedPets);

			setAllUserPets(petsResponse.data.data);
			return { success: true, msg: petsResponse.data };
		} catch (error) {
			console.log("get pets of user error", error);
			return { success: false, msg: error };
		}
	};

	const getUserPets = async (userId) => {
		try {
			const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
			const Headers = {
				Authorization: ACCESS_TOKEN,
			};
			const petsRes = await axios.get(`${baseURL}/users/userPets/${userId}`, {
				headers: Headers,
			});
			setUserPets(petsRes.data.data);
		} catch (error) {
			console.log("get user pets error", error);
			errorToast("Error accured", `${error.message}`);
		}
	};

	const updateUser = async (user) => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const updateRes = await axios.put(`${baseURL}/users/${user._id}`, user, {
				headers: Headers,
			});
			setSelectedUser(updateRes.data);
		} catch (error) {
			console.log("user update error", error);
		}
	};

	const changePassword = async (passwordsOBJ, onClose) => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const newPassword = {
				oldPassword: passwordsOBJ.oldPassword,
				newPassword: passwordsOBJ.newPassword,
			};
			const passChangeRes = await axios.put(`${baseURL}/users/`, newPassword, {
				headers: Headers,
			});
			if (passChangeRes.data.error) {
				errorToast("Error", `${passChangeRes.data.message}`);
				return;
			}
			successToast("Awesome", "Password changed successfuly");
			onClose();
		} catch (error) {}
	};

	const updateSavedPets = async (petId) => {
		try {
			const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
			const Headers = {
				Authorization: ACCESS_TOKEN,
			};
			const savePetRes = await axios.put(
				`${baseURL}/users/savepet/${petId}`,
				{},
				{ headers: { Authorization: ACCESS_TOKEN } }
			);
			setUserData(savePetRes.data.data);
			setPetSavedToUser(true);
			return savePetRes;
		} catch (error) {
			console.log("save pet error", error);
		}
	};

	return {
		getUsers,
		isOwner,
		updateUser,
		getUserInfo,
		changePassword,
		updateSavedPets,
		getMyPets,
		getUserPets,
	};
}

export default useUsers;
