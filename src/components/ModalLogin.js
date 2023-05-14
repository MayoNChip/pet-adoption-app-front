import React from "react";
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
import { Formik, Form, Field } from "formik";
import UseAuth from "../Hooks/useAuth";

function ModalLogin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const { userLogin } = UseAuth();

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

  return (
    <>
      <Button
        w="70px"
        h="35px"
        bg="cyan.600"
        color="white"
        _hover={{ bg: "cyan.500", color: "white" }}
        onClick={onOpen}
        boxShadow="xs"
      >
        Login
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <Flex direction="column" alignItems="center">
            <Flex bgImage={bulletDog} w="50px" h="40px" bgSize="100%"></Flex>
            <ModalHeader d="flex" w="100%" justifyContent="center">
              Login to your account
            </ModalHeader>
          </Flex>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values, actions, props) => {
                const LoginResponse = userLogin(values, actions, onClose);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
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
                          type="password"
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
                  {!!props.status && (
                    <Text textAlign="center" color="red">
                      {props.status}
                    </Text>
                  )}
                  <Flex
                    id="formButtons"
                    h="50px"
                    w="100%"
                    mt="20px"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Button
                      colorScheme="blue"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
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
export default ModalLogin;
