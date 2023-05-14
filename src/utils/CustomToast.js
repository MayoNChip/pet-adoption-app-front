import { useToast } from "@chakra-ui/react";
import UseAuth from "../Hooks/useAuth";

export default function CustomToast() {
  // const { toast } = UseAuth();
  const toast = useToast();

  const successToast = (title, description) => {
    toast({
      title: title || "Success.",
      description: description || "",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const errorToast = (title, description) => {
    toast({
      title: title || "Something went wrong, Try again.",
      description: description || "",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  return { successToast, errorToast };
}
