import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

function Content(props) {
  return (
    <Flex
      //   justifyContent="space-between"
      flexDirection="column"
      textAlign="center"
      width={props.width}
      color="green.200"
      height={props.height}
    >
      <Heading mb="15px">{props.title}</Heading>
      <Heading fontSize="18">{props.content}</Heading>
    </Flex>
  );
}

export default Content;
// So you want to add a family member? There is no better way than to adopt
// a shelter pet and give him or her a second chance.
