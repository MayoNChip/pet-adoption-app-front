import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import bulletDog from "../img/bulletdog.png";
import { Formik, Form, Field, setNestedObjectValues } from "formik";
import useAuth from "../Hooks/useAuth";

function ModalSignup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const { userRegister } = useAuth();

  function validateName(value) {
    let error;
    if (!value) {
      error = `Name is required`;
    }
    return error;
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  function validatePassword(value) {
    let error = "";
    if (!value) {
      error = "Password is required";
    }
    return error;
  }

  function validatePassMatch(pass, value) {
    let error = "";
    if (!value) {
      error = "Confirm password field is required";
    } else if (pass !== value) {
      error = "Password does not match";
    }

    // error = "Password is required";
    return error;
  }

  function validatePhoneNumber(value) {
    let error = "";
    if (
      typeof value !== Number &&
      !/^0\d([\d]{0,1})([-]{0,1})\d{7}$/.test(value)
    ) {
      error = "Not a valid phone number";
    }
    return error;
  }

  const globalHandleChange = (formikHandleChange, setStatus) => {
    setStatus(null);
    formikHandleChange();
  };

  return (
    <>
      <Button
        bg="cyan.600"
        color="white"
        _hover={{ bg: "cyan.500", color: "white" }}
        onClick={onOpen}
        w="70px"
        h="35px"
        boxShadow="xs"
      >
        Sign up
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pb={6}>
            <Flex
              h="100px"
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Flex bgImage={bulletDog} w="50px" h="40px" bgSize="100%"></Flex>
              <ModalHeader p="0" d="flex" w="100%" justifyContent="center">
                Create your account
              </ModalHeader>
            </Flex>
            <ModalCloseButton />
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                repassword: "",
                phonenumber: "",
              }}
              onSubmit={async (values, actions, props) => {
                await userRegister(values, actions, onClose);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="firstname" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.firstname && form.touched.firstname
                        }
                      >
                        <FormLabel m htmlFor="firstname">
                          First name
                        </FormLabel>
                        <Input
                          {...field}
                          id="firstname"
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          placeholder="Enter your first name"
                        />
                        <FormErrorMessage>
                          {form.errors.firstname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastname">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.lastname && form.touched.lastname
                        }
                      >
                        <FormLabel htmlFor="lastname">Last Name</FormLabel>
                        <Input
                          {...field}
                          onChange={props.handleChange}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onBlur={props.handleBlur}
                          value={props.values.lastname}
                          placeholder="Enter your last name"
                        />
                        <FormErrorMessage>
                          {form.errors.lastname}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Input
                          {...field}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.email}
                          placeholder="Enter your Email address"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" validate={validatePassword}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.password}
                          placeholder="Create your password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="repassword"
                    validate={(value) =>
                      validatePassMatch(props.values.password, value)
                    }
                  >
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.repassword && form.touched.repassword
                        }
                      >
                        <FormLabel htmlFor="repassword">
                          Confirm Password
                        </FormLabel>
                        <Input
                          {...field}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.repassword}
                          placeholder="Confirm Password"
                        />
                        <FormErrorMessage>
                          {form.errors.repassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phonenumber" validate={validatePhoneNumber}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.phonenumber && form.touched.phonenumber
                        }
                      >
                        <FormLabel htmlFor="phonenumber">
                          Phone Number
                        </FormLabel>
                        <Input
                          {...field}
                          onInput={() => {
                            props.setStatus(false);
                          }}
                          onChange={props.handleChange}
                          // type={"number"}
                          onBlur={props.handleBlur}
                          value={props.values.phonenumber}
                          placeholder="Enter your phone number"
                        />
                        <FormErrorMessage>
                          {form.errors.phonenumber}
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
                      Sign Up!
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalSignup;
