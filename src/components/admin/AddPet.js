import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Heading,
  HStack,
  Select,
  useToast,
  Avatar,
  AvatarBadge,
  IconButton,
  Spinner,
  Image,
  Checkbox,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import usePets from "../../Hooks/usePets";
import { EditIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import PetContext from "../../context/PetContext";

function FormHelper({ resetForm, petDetails }) {
  useEffect(() => {
    resetForm({
      values: {
        image: "",
        petType: petDetails.petType || "",
        name: petDetails.name || "",
        age: petDetails.age || "",
        petStatus: petDetails?.petStatus || "not-adopted",
        height: petDetails.height || "",
        weight: petDetails.weight || "",
        color: petDetails.color || "",
        petBio: petDetails?.petBio || "",
        hypoallergenic: petDetails?.hypoallergenic || "",
        diet: petDetails.diet || "",
        breed: petDetails.breed || "",
        breed2: petDetails.breed2 || "",
      },
    });
  }, [petDetails]);
  return <></>;
}

function AddPet() {
  const { petId } = useParams();
  const {
    imageUpload,
    addPet,
    petImage,
    setPetImage,
    updatePet,
    // petBreedsList,
    setPetType,
    getPetInfo,
    petType,
    changBreedsList,
  } = usePets();
  const toast = useToast();
  const selectImage = useRef();
  const [isMixed, setIsMixed] = useState(false);
  const {
    isUpdated,
    petDetails,
    setPetDetails,
    petBreedsList,
    setPetBreedsList,
  } = useContext(PetContext);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const subscription = { unsubscribe: () => undefined };
    setIsLoading(true);
    if (petId) {
      const getPetDetails = async () => {
        const response = await getPetInfo(petId);

        if (response.breed2) {
          setIsMixed(true);
        }
      };
      getPetDetails();
    } else {
      setPetDetails({});
    }
    return () => {
      subscription.unsubscribe();
    };
  }, [setPetDetails, petId]);

  useEffect(() => {
    setIsLoading(true);
    const changeTypeList = async () => {
      const breedsList = await changBreedsList();
    };
    setIsLoading(false);

    changeTypeList();
  }, [petType]);

  const uploadImageClick = () => {
    selectImage.current.click();
  };

  const handleIsMixed = () => {
    setIsMixed(!isMixed);
  };

  return (
    <Flex w="100%" justifyContent="center" mt="20px">
      <Flex w="600px" boxShadow="md" backgroundColor="white">
        <Flex direction="column" w="100%" p="20px">
          <Heading color="cyan.400" m="20px 0 40px 10px">
            Add a Pet
          </Heading>
          <Flex w="100%" backgroundColor="white" justifyContent="center">
            <Formik
              style={{ width: "500px" }}
              initialValues={{
                image: petDetails?.image || null,
                petType: petDetails?.petType || "",
                name: petDetails?.name || "",
                age: petDetails?.age || "",
                petStatus: petDetails?.petStatus || "not-adopted",
                height: petDetails?.height || "",
                weight: petDetails?.weight || "",
                color: petDetails?.color || "",
                petBio: petDetails?.petBio || "",
                hypoallergenic: petDetails?.hypoallergenic
                  ? "true"
                  : "false" || "",
                diet: petDetails.diet || "",
                breed: petDetails.breed || "",
                breed2: petDetails.breed2 || "",
              }}
              onSubmit={async (values, actions, props) => {
                if (petImage && petId) {
                  const imageUrl = await imageUpload();
                  values.image = imageUrl;
                  const response = await updatePet(values);

                  return;
                }
                if (petImage) {
                  const imageUrl = await imageUpload();
                  values.image = imageUrl;
                }

                if (values.image) {
                  const response = await addPet(values);
                } else {
                  toast({
                    title: "An error occurred.",
                    description: "Image is too large, Pick a different image",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                }
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <FormHelper
                    resetForm={props.resetForm}
                    petDetails={petDetails}
                  />
                  <Flex direction="column" w="500px">
                    <Field name="image">
                      {({ form }) => (
                        <FormControl
                          isRequired
                          isInvalid={form.errors.image && form.touched.image}
                        >
                          <Flex w="100%" justifyContent="center" mb="50px">
                            <Avatar
                              size="2xl"
                              src={petDetails?.image || petImage}
                              alt="profile_picture"
                            >
                              <AvatarBadge
                                as={IconButton}
                                color="white"
                                icon={<EditIcon w="15px" />}
                                size={8}
                                boxSize={8}
                                right="20px"
                                rounded="full"
                                bg="cyan.200"
                                _hover={{ cursor: "pointer", bg: "cyan.100" }}
                                borderColor="cyan.300"
                                borderWidth="0.5px"
                                _focus="none"
                                _active="none"
                                onClick={uploadImageClick}
                              />
                            </Avatar>

                            <input
                              ref={selectImage}
                              border="none"
                              fontSize="24px"
                              type="file"
                              name="image"
                              id="image"
                              w="50px"
                              style={{ display: "none" }}
                              onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  setPetImage(reader.result);
                                };
                              }}
                            />
                          </Flex>

                          <FormErrorMessage>
                            {form.errors.image}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <HStack>
                      <Field name="name">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              htmlFor="name"
                              fontWeight="bold"
                              fontSize="18px"
                            >
                              Pet name
                            </FormLabel>

                            <Input
                              defaultValue={props.values.name}
                              variant="flushed"
                              {...field}
                              width="200px"
                              id="name"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet name"
                            />
                            <FormErrorMessage mt="2px">
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="age">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.age && form.touched.age}
                            mb="10px"
                          >
                            <FormControl id="age" isRequired>
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="age"
                                mt="10px"
                              >
                                Age
                              </FormLabel>
                              <Input
                                defaultValue={props.values.age}
                                variant="flushed"
                                {...field}
                                type="text"
                                id="age"
                                onInput={() => {
                                  props.setStatus(false);
                                }}
                                placeholder="Enter pet age"
                              />
                            </FormControl>
                            <FormErrorMessage>
                              {form.errors.age}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="petType">
                        {({ field, form }) => {
                          const { onChange, ...rest } = field;
                          return (
                            <FormControl
                              id="petType"
                              isRequired
                              isInvalid={
                                form.errors.petType && form.touched.petType
                              }
                            >
                              <FormControl id="petType" isRequired mt="3">
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="petType"
                                >
                                  Type of Pet
                                </FormLabel>
                                <RadioGroup {...rest} id="petType">
                                  <Stack direction="row" align="center">
                                    <Radio
                                      onChange={field.onChange}
                                      value="dog"
                                      id="petType"
                                    >
                                      Dog
                                    </Radio>
                                    <Radio
                                      onChange={field.onChange}
                                      value="cat"
                                      id="petType"
                                    >
                                      Cat
                                    </Radio>
                                  </Stack>
                                </RadioGroup>
                              </FormControl>
                              <FormErrorMessage>
                                {form.errors.petType}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                      <Field name="petStatus">
                        {({ field, form }) => (
                          <FormControl
                            id="petStatus"
                            isRequired
                            isInvalid={
                              form.errors.petStatus && form.touched.petStatus
                            }
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="petStatus"
                            >
                              Pet Status
                            </FormLabel>
                            <Select
                              name="petStatus"
                              id="petStatus"
                              onChange={field.onChange}
                              defaultValue={props.values.petStatus}
                            >
                              <option value="adopted">Adopted</option>
                              <option value="fostered">Fostered</option>
                              <option value="not-adopted">
                                Waiting for a family
                              </option>
                            </Select>
                            <FormErrorMessage>
                              {form.errors.petStatus}
                            </FormErrorMessage>
                          </FormControl>
                          // );
                        )}
                      </Field>
                    </HStack>
                    <Flex w="50%" h="50px">
                      <Checkbox
                        onChange={handleIsMixed}
                        checked={isMixed}
                        defaultChecked={petDetails?.breed2 ? true : false}
                      >
                        Mixed Breed
                      </Checkbox>
                    </Flex>
                    <Flex direction="column">
                      <Field name="breed">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.breed && form.touched.breed}
                            mb="10px"
                          >
                            <FormControl id="breed" isRequired>
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="breed"
                                mt="10px"
                              >
                                Pet Breed
                              </FormLabel>

                              <Select
                                name="breed"
                                onChange={field.onChange}
                                onClick={() => {
                                  setPetType(props.values.petType);
                                }}
                              >
                                {isLoading ? (
                                  <Flex
                                    w="100%"
                                    h="100%"
                                    alignItems="center"
                                    justifyContent="center"
                                    p="fixed"
                                    top="50%"
                                    left="50%"
                                  >
                                    <Spinner
                                      thickness="4px"
                                      speed="0.65s"
                                      emptyColor="gray.200"
                                      color="blue.500"
                                      size="xl"
                                    />
                                  </Flex>
                                ) : (
                                  petBreedsList &&
                                  petBreedsList.map((breed) => {
                                    return (
                                      <option key={breed.id} value={breed.name}>
                                        {breed.name}
                                      </option>
                                    );
                                  })
                                )}
                              </Select>
                            </FormControl>
                            <FormErrorMessage>
                              {form.errors.breed}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      {isMixed && (
                        <Field name="breed2">
                          {({ field, form }) => (
                            <FormControl
                              isRequired
                              isInvalid={
                                form.errors.breed2 && form.touched.breed2
                              }
                              mb="10px"
                            >
                              <FormControl id="breed2" isRequired>
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="breed2"
                                  mt="10px"
                                >
                                  Second Pet Breed
                                </FormLabel>

                                <Select
                                  name="breed2"
                                  onChange={field.onChange}
                                  onClick={() => {
                                    setPetType(props.values.petType);
                                  }}
                                >
                                  {isLoading ? (
                                    <Flex
                                      w="100%"
                                      h="100%"
                                      alignItems="center"
                                      justifyContent="center"
                                      p="fixed"
                                      top="50%"
                                      left="50%"
                                    >
                                      <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                      />
                                    </Flex>
                                  ) : (
                                    petBreedsList &&
                                    petBreedsList.map((breed) => {
                                      return (
                                        <option
                                          key={breed.id}
                                          value={breed.name}
                                        >
                                          {breed.name}
                                        </option>
                                      );
                                    })
                                  )}
                                </Select>
                              </FormControl>
                              <FormErrorMessage>
                                {form.errors.breed2}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      )}
                    </Flex>
                    <HStack>
                      <Field name="height">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.height && form.touched.height
                            }
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="height"
                            >
                              Pet Height
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="number"
                              id="height"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet type"
                            />
                            <FormErrorMessage>
                              {form.errors.height}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="weight">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={
                              form.errors.weight && form.touched.weight
                            }
                          >
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="weight"
                            >
                              Pet Weight
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="number"
                              id="weight"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Enter pet weight"
                            />
                            <FormErrorMessage>
                              {form.errors.weight}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </HStack>
                    <HStack>
                      <Field name="color">
                        {({ field, form }) => (
                          <FormControl
                            isRequired
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormControl id="color" isRequired mt="3">
                              <FormLabel
                                fontWeight="bold"
                                fontSize="18px"
                                htmlFor="color"
                              >
                                Pet Color
                              </FormLabel>
                              <Input
                                variant="flushed"
                                {...field}
                                type="text"
                                id="color"
                                onInput={() => {
                                  props.setStatus(false);
                                }}
                                placeholder="Enter pet color"
                              />
                            </FormControl>
                            <FormErrorMessage>
                              {form.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="hypoallergenic">
                        {({ field, form }) => {
                          const { onChange, ...rest } = field;
                          return (
                            <FormControl
                              id="hypoallergenic"
                              isRequired
                              isInvalid={
                                form.errors.hypoallergenic &&
                                form.touched.hypoallergenic
                              }
                            >
                              <FormControl
                                id="hypoallergenic"
                                isRequired
                                mt="3"
                              >
                                <FormLabel
                                  fontWeight="bold"
                                  fontSize="18px"
                                  htmlFor="hypoallergenic"
                                >
                                  hypoallergenic?
                                </FormLabel>
                                <RadioGroup {...rest} id="hypoallergenic">
                                  <Stack direction="row" align="center">
                                    <Radio
                                      onChange={field.onChange}
                                      value="true"
                                      id="hypoallergenic"
                                    >
                                      Yes
                                    </Radio>
                                    <Radio
                                      onChange={field.onChange}
                                      value="false"
                                      id="hypoallergenic"
                                    >
                                      No
                                    </Radio>
                                  </Stack>
                                </RadioGroup>
                              </FormControl>
                              <FormErrorMessage>
                                {form.errors.hypoallergenic}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </HStack>
                    <Field name="diet">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.diet && form.touched.diet}
                        >
                          <FormControl id="diet" mt="3">
                            <FormLabel
                              fontWeight="bold"
                              fontSize="18px"
                              htmlFor="diet"
                              mb="10px"
                            >
                              Pet Diet
                            </FormLabel>
                            <Input
                              variant="flushed"
                              {...field}
                              type="text"
                              id="diet"
                              onInput={() => {
                                props.setStatus(false);
                              }}
                              placeholder="Special food/menu"
                            />
                          </FormControl>
                          <FormErrorMessage>
                            {form.errors.diet}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="petBio">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.petBio && form.touched.petBio}
                        >
                          <FormLabel
                            fontWeight="bold"
                            fontSize="18px"
                            htmlFor="petBio"
                          >
                            Pet Bio
                          </FormLabel>
                          <Textarea
                            {...field}
                            type="text"
                            id="petBio"
                            onInput={() => {
                              props.setStatus(false);
                            }}
                            placeholder="Enter pet bio..."
                          />
                          <FormErrorMessage>
                            {form.errors.petBio}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {!!props.status && (
                      <Text textAlign="center" color="red">
                        {props.status}
                      </Text>
                    )}
                    <Flex
                      h="80px"
                      w="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Button
                        colorScheme="blue"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Add
                      </Button>
                    </Flex>
                  </Flex>
                </Form>
              )}
            </Formik>
            {/* )} */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AddPet;
