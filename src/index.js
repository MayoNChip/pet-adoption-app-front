import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./themes/theme";
import { PetProvider } from "./context/PetContext";
import { AuthProvider } from "./context/UserContext";

ReactDOM.render(
  <Router>
    <PetProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AuthProvider>
    </PetProvider>
  </Router>,
  document.getElementById("root")
);
