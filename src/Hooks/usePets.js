import axios from "axios";
import localforage from "localforage";
import { useContext, useState } from "react";
import PetContext from "../context/PetContext";
import CustomToast from "../utils/CustomToast";
import CONFIG from "../utils/config";
import { v4 as uuidv4 } from "uuid";

const baseURL = process.env.BACKEND_BASE_URL || "http://localhost:4000";

export default function usePets() {
	const {
		pets,
		setPets,
		setPetDetails,
		petDetails,
		setIsUpdated,
		petBreedsList,
		setPetBreedsList,
	} = useContext(PetContext);
	const [petImage, setPetImage] = useState();
	const [newPetId, setNewPetId] = useState();
	const [setPetsList] = useState();

	const [petType, setPetType] = useState();
	const { errorToast, successToast } = CustomToast();

	const imageUpload = async () => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
			"Content-type": "application/json",
		};
		const jsonImage = JSON.stringify({ data: petImage });
		try {
			const response = await axios({
				url: `${baseURL}/upload/pet/${newPetId}`,
				method: "POST",
				headers: Headers,
				data: jsonImage,
			});
			return response.data.imageUrl;
		} catch (error) {
			console.log("send image to backend error", error.message);
		}
	};

	const changBreedsList = async () => {
		const breedListRes = await getBreeds(petType);
		setPetBreedsList(breedListRes);
	};

	const addPet = async (values) => {
		values.hypoallergenic === "true"
			? (values.hypoallergenic = true)
			: (values.hypoallergenic = false);
		const newPet = { _id: uuidv4(), ...values };
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const Headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const response = await axios.post(`${baseURL}/pets/`, newPet, {
				headers: Headers,
			});
			if (response.status === 200) {
				setNewPetId(response);
				successToast(
					"Pet Added Succesfully!",
					"You can find the new pet in the search page!",
					5000
				);
				return response;
			}
		} catch (err) {
			console.log("pet was not added with error", err);
		}
	};

	const getPets = async () => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const headers = {
			Authorization: ACCESS_TOKEN,
		};
		try {
			const petList = await axios.get(`${baseURL}/pets/`, {
				headers,
			});
			if (petList.data.length > 0) {
				setPets(petList.data);
				return petList.data;
			}
			return petList.data.message;
		} catch (err) {
			console.log("could not get pets with error", err);
		}
	};

	const getBreeds = async (petType) => {
		try {
			const breedsList = await axios.get(
				`${
					petType === "dog"
						? CONFIG.DOG_API_BREEDS_URL
						: CONFIG.CAT_API_BREEDS_URL
				}`,
				{
					headers: {
						"x-api-key": `${
							petType === "dog" ? CONFIG.DOG_API_KEY : CONFIG.CAT_API_KEY
						}`,
					},
				}
			);
			setPetBreedsList(breedsList.data);
			return breedsList.data;
		} catch (error) {
			console.log("pet breeds error", error);
		}
	};

	const getPetInfo = async (petId) => {
		try {
			const response = await axios.get(`${baseURL}/pets?_id=${petId}`);
			if (response.status) {
				setPetDetails(response.data.message[0]);
				return response.data.message[0];
			}
		} catch (error) {
			console.log("get pet details error ==>", error);
			errorToast("Error", "Failed Loading Pet");
		}
	};

	const updatePet = async (newPet) => {
		const ACCESS_TOKEN = await localforage.getItem("ACCESS_TOKEN");
		const headers = {
			Authorization: ACCESS_TOKEN,
		};
		if (!ACCESS_TOKEN) {
			errorToast("Error", "Please login first", 2000);
			return false;
		}
		const petId = petDetails._id;

		try {
			const updateResponse = await axios.post(
				`${baseURL}/pets/status/${petId}`,
				newPet,
				{ headers }
			);
			if (updateResponse.data.error) {
				errorToast("Error", updateResponse.data.message, 2000);
				return;
			}
			setPetDetails({ ...petDetails, ...newPet });
			setIsUpdated(true);
			return updateResponse.data;
		} catch (error) {
			console.log("updating pet error", error);
		}
	};

	const searchPet = async (filter) => {
		try {
			const searchRes = await axios.post(`${baseURL}/pets/search/`, filter);
			if (searchRes.data.success) {
				setPets(searchRes.data.message);

				successToast(
					"Success!",
					`search returned ${searchRes.data.message.length} results`
				);
			} else {
				successToast("Success!", `${searchRes.data.message}`, 5000);
				setPets([]);
			}
			return searchRes;
		} catch (error) {
			console.log("search pet error", error);
			errorToast("Error", "could not complete the search");
		}
	};

	return {
		pets,
		imageUpload,
		addPet,
		getPets,
		petImage,
		setPetImage,
		setPetsList,
		getPetInfo,
		getBreeds,
		setPetBreedsList,
		petBreedsList,
		petType,
		setPetType,
		updatePet,
		changBreedsList,
		searchPet,
	};
}
