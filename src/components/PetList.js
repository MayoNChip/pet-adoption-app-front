import { Flex, Link, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetContext from "../context/PetContext";
import PetCard from "./PetCard";

function PetList() {
	const { pets } = useContext(PetContext);
	const navigate = useNavigate();

	return (
		<Flex wrap="wrap">
			{pets ? (
				pets.map((pet) => {
					return (
						<PetCard
							key={pet._id}
							id={pet._id}
							image={pet.image}
							name={pet.name}
							age={pet.age}
							breed={pet.breed}
							breed2={pet.breed2}
							color={pet.color}
							height={pet.height}
							weight={pet.weight}
							type={pet.petType}
							status={pet.petStatus}
							bio={pet.petBio}
							hypoallergenic={pet.hypoallergenic}
							diet={pet.diet}
						/>
					);
				})
			) : (
				<Flex
					w="100%"
					direction="column"
					alignSelf="center"
					textAlign="center"
					justifyContent="center"
				>
					<Text fontSize="xl" m=" 0 auto" fontWeight="black">
						You don't own any pets, maybe its time to adopt a new friend for
						life? :)
						<Text>
							Browse available pets{" "}
							{
								<Link color="cyan.500" onClick={() => navigate("/search")}>
									here
								</Link>
							}
						</Text>
					</Text>
				</Flex>
			)}
		</Flex>
	);
}

export default PetList;
