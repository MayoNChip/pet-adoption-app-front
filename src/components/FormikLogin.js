import React, { useContext } from "react";
import { Formik } from "formik";
import { Flex, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import userContext from "../context/UserContext";

const FormikLogin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setLoggedIn } = useContext(userContext);

  const handleLogin = async (values) => {
    if (values) {
      try {
        const resp = await axios.post(
          "http://localhost:4000/auth/login",
          values
        );
        if ((resp.status = 200)) {
          setLoggedIn(true);
        }
      } catch (err) {
        console.log("Login failed with error", err);
      }
    } else {
    }
  };

  return (
    <Flex>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <ModalFooter>
              <Button
                disabled={isSubmitting}
                type="submit"
                colorScheme="cyan"
                color="white"
                mr={3}
              >
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        )}
      </Formik>
    </Flex>
  );
};

export default FormikLogin;
