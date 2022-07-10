import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CLIENT } from "../../../graphql/mutations/clientMutations";

interface IRemoveCustomerModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  name: string;
}
const DeleteCustomerModal = ({
  isOpen,
  onClose,
  id,
  name,
}: IRemoveCustomerModal) => {
  const cancelRef = useRef<HTMLDivElement>(null);
  const [removeClient] = useMutation(REMOVE_CLIENT, {
    variables: { id: id },
  });
  const toast = useToast();
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              {/* @ts-ignore */}
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  try {
                    removeClient();
                    const toastError = toast({
                      title: `${name} Removed Succesfully`,
                      description: "Client has been removed successfully",
                      position: "top",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                    onClose();
                  } catch (error) {
                    onClose();
                    const toastError = toast({
                      title: `Error Removing Client`,
                      description: error as any,
                      position: "top",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
                ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCustomerModal;
