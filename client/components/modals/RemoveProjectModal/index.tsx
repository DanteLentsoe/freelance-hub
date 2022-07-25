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
import { REMOVE_PROJECT } from "../../../graphql/mutations/projectMutations";
import { GET_CLIENTS } from "../../../graphql/queries/client";
import { IProject } from "../../../contants/types";

interface IRemoveProjectModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  name: string;
}

const RemoveProjectModal = ({
  isOpen,
  onClose,
  id,
  name,
}: IRemoveProjectModal) => {
  const cancelRef = useRef<HTMLDivElement>(null);
  const [removeProject] = useMutation(REMOVE_PROJECT, {
    variables: { id: id },
    update(cache, { data: { removeProject } }) {
      // @ts-ignore
      const { projects } = cache.readQuery<IProject>({
        query: REMOVE_PROJECT,
      });
      cache.writeQuery({
        query: REMOVE_PROJECT,
        data: {
          projects: projects.filter(
            (project: IProject) => project.id !== removeProject.id
          ),
        },
      });
    },
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
                    removeProject();
                    const toastError = toast({
                      title: `${name} Removed Succesfully`,
                      description: "Project has been removed successfully",
                      position: "top",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                    onClose();
                  } catch (error) {
                    onClose();
                    const toastError = toast({
                      title: `Error Removing Project`,
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

export default RemoveProjectModal;
