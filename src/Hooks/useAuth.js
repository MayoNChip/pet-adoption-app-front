import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
import { userContext } from "../context/UserContext";
import localforage from "localforage";
import CustomToast from "../utils/CustomToast";
import { useToast } from "@chakra-ui/react";

export default function UseAuth() {
	const {
		setLoggedIn,
		userData,
		newUserDetails,
		setNewUserDetails,
		newImageDisplay,
		setUserData,
		setIsLoading,
		isOwnedByUser,
		setIsEdit,
		isLoggedIn,
	} = useContext(userContext);
	const { errorToast, successToast } = CustomToast();
	const navigate = useNavigate();

	const baseURL = process.env.BACKEND_BASE_URL || "http://16.16.162.111:4000";

	const handleLogout = async () => {
		const res = await localforage.clear();
		setLoggedIn(false);
		isOwnedByUser(false);
		navigate("/home");
	};

	const userRegister = async (values, actions, onClose) => {
		try {
			const newUser = {};
			const response = await axios.post(`${baseURL}/auth/register`, values);
			if (response.data.success)
				successToast(
					"Registered Successfuly!",
					"You can set your profile picture on your profile settings!"
				);
			setLoggedIn(true);
			await localforage.setItem("ACCESS_TOKEN", response.data.ACCESS_TOKEN);

			navigate("/");
			onClose();
		} catch (err) {
			console.log("user register error ==> ", err.response.data.message);
			const errorMessage = err.response.data.message;
			actions.setStatus(errorMessage);
		}
	};

	const userLogin = async (userObj, actions, onClose) => {
		try {
			const resp = await axios.post(`${baseURL}/auth/login`, userObj);
			if (resp.status === 200)
				await localforage.setItem("ACCESS_TOKEN", resp.data);
			successToast("Success.", "Logged in successfully.");
			setLoggedIn(true);
			onClose();
			navigate("/home");
		} catch (err) {
			console.log("ERROR ==> ", err.response.data.message);
			const errorMessage = err.response.data.message;

			errorToast("Oops, something went wrong :O", errorMessage);
		}
	};

	const checkIsLoggedIn = async () => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		try {
			const user = await axios.get(`${baseURL}/users/me`, {
				headers: { Authorization: ACCESS_TOKEN },
			});
			const userInfo = user?.data;

			if (user) {
				const isSetToLocalForage = await localforage.setItem(
					"userInfo",
					userInfo
				);
				return userInfo;
			} else {
				await localforage.removeItem("ACCESS_TOKEN");
				return false;
			}
		} catch (err) {
			console.log("check logged in error", err);
			return false;
		}
	};

	const updateUserDetails = async (updatedValues) => {
		try {
			// setIsLoading(true);
			const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");

			const response = await axios.put(
				`${baseURL}/users/${userData._id}`,
				updatedValues,
				{ headers: { Authorization: ACCESS_TOKEN } }
			);
			if (response.status === 200) {
				setNewUserDetails(updatedValues);
			}

			return response.data;
		} catch (error) {
			console.log("updatig user details error", error);
		}
	};

	const imageUpload = async () => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const userData = await localforage.getItem("userInfo");
		const userId = userData._id;
		const Headers = {
			Authorization: ACCESS_TOKEN,
			"Content-type": "application/json",
		};
		const jsonImage = JSON.stringify({ data: newImageDisplay });
		try {
			const response = await axios({
				url: `${baseURL}/upload/user/${userId}`,
				method: "POST",
				headers: Headers,
				data: jsonImage,
			});
			if (response.data.imageUrl) {
				setNewUserDetails({
					...newUserDetails,
					image: response.data.imageUrl,
				});
			}
			return response.data.imageUrl;
		} catch (error) {
			console.log("send image to backend error", error.message);
			return error;
		}
	};

	return {
		userRegister,
		checkIsLoggedIn,
		userLogin,
		handleLogout,
		updateUserDetails,
		imageUpload,
	};
}
