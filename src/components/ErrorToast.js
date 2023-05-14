import { useToast } from "@chakra-ui/react";
import React from "react";

function ErrorToast() {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "An error occurred.",
          description: "Unable to create user account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Show Error Toast
    </Button>
  );
}

export default ErrorToast;
