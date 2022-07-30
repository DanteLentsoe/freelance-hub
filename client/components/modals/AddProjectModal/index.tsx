import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SetStateAction, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { addProjectModal } from "../../../store/atoms";
import { theme } from "../../../utils/theme";
import { GET_PROJECTS } from "../../../graphql/queries/project";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../../../graphql/mutations/projectMutations";
import { GET_CLIENTS } from "../../../graphql/queries/client";
import { IClient, IEventAction, IProject } from "../../../contants/types";

interface IClientCollection {
  clients: IClient[];
}
const AddProjectModal = () => {
  const [isProjectModalOpen, setCloseProjectModal] = useRecoilState(
    addProjectModal
  );
  const toast = useToast();
  const { data, error, loading } = useQuery<IClientCollection>(GET_CLIENTS);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("Not Started");
  const [isProjectCompleted, setProjectIsCompleted] = useState<boolean>(false);
  const [projectAmount, setProjectAmount] = useState<number | undefined>(
    undefined
  );
  const [clientId, setClientID] = useState<string>("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [addProject] = useMutation<IProject>(ADD_PROJECT, {
    variables: {
      name: projectName,
      description: projectDescription,
      status: projectStatus,
      completed: isProjectCompleted,
      clientId: clientId,
      amount: projectAmount as number,
    },
    refetchQueries: [GET_PROJECTS],
  });

  const onSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addProject();
    setProjectAmount(undefined);
    setProjectStatus("");
    setProjectDescription("");
    setProjectDescription("");
    setProjectName("");
  };

  if (error) {
    const toastError = toast({
      title: "Error Screen.",
      description: error.message,
      position: "top",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
  return (
    <>
      {!loading && !error && (
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isProjectModalOpen}
          onClose={() => {
            setCloseProjectModal(false);
          }}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader alignItems={"center"} textAlign={"center"}>
              Add Project
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={onSubmitHandler}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Project Name</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Project name"
                    value={projectName}
                    id="name"
                    onChange={(event: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      setProjectName(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Project Total Cost"
                    value={Number(projectAmount)}
                    type="number"
                    id="phone"
                    //   @ts-ignore
                    onChange={(event: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setProjectAmount(+event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Project Status</FormLabel>

                  <Select
                    value={projectStatus}
                    id="status"
                    onChange={(event: IEventAction) => {
                      setProjectStatus(event.target.value);
                    }}>
                    <option value="Not Started"> Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Project Client </FormLabel>

                  <Select
                    value={clientId}
                    id="clientId"
                    onChange={(event: IEventAction) => {
                      setClientID(event.target.value as string);
                    }}>
                    <>
                      <option value=""> Select Client</option>
                      {data?.clients.map((client: IClient) => {
                        return (
                          <>
                            <option value={client.id} key={client.id}>
                              {client.name}
                            </option>
                          </>
                        );
                      })}
                    </>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Project Description"
                    id="notes"
                    value={projectDescription}
                    h={100}
                    onChange={(event: IEventAction) => {
                      setProjectDescription(event.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  bg={theme.Color.secondary}
                  color={"white"}
                  type="submit"
                  mr={3}
                  _hover={{
                    backgroundColor: theme.Color.tertiary,
                  }}
                  onClick={() => {
                    setCloseProjectModal(false);
                  }}>
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setCloseProjectModal(false);
                  }}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AddProjectModal;
