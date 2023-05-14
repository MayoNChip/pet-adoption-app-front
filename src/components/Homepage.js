import { Flex, Heading, Box, Divider, Text, useConst } from "@chakra-ui/react";
import React, { useContext } from "react";
import userContext from "../context/UserContext";
import LoggedInHomepage from "./LoggedInHomepage";
import NotLoggedInHomepage from "./NotLoggedInHomepage";

function Homepage() {
  const { isLoggedIn } = useContext(userContext);

  return (
    <Flex flexDirection="column" justifyContent="space-around" w="100%">
      {isLoggedIn ? <LoggedInHomepage /> : <NotLoggedInHomepage />}
    </Flex>
  );
}

export default Homepage;
