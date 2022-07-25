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
import { IClient, IProject } from "../../../contants/types";

interface IClientCollection {
  clients: IClient[];
}
const AddProjectModal = () => {
  const [isProjectModalOpen, setCloseProjectModal] = useRecoilState(
    addProjectModal
  );
  const toast = useToast();
  const { client, data, error, loading } = useQuery<IClientCollection>(
    GET_CLIENTS
  );
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("Not Started");
  const [isProjectCompleted, setProjectIsCompleted] = useState<boolean>(false);
  const [projectClient, setProjectClient] = useState("");
  const [projectAmount, setProjectAmount] = useState<number>();
  const [clientId, setClientID] = useState<string>("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [addProject] = useMutation<IProject>(ADD_PROJECT, {
    variables: {
      name: projectName,
      description: projectDescription,
      status: projectStatus,
      completed: isProjectCompleted,
    },
    refetchQueries: [GET_PROJECTS],
  });

  console.log("Data ", data?.clients);

  // const onSubmitHandler = (event: any) => {
  //   event.preventDefault();
  //   addClient();
  // };

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log(
      "VALUE ",
      projectName,
      projectDescription,
      projectStatus,
      projectStatus,
      isProjectCompleted,
      projectClient,
      projectAmount
    );
    addProject();
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
                  <FormLabel>Project Client</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Client Name of Project"
                    value={projectClient}
                    id="name"
                    onChange={(event: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      setProjectClient(event.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="Project Total Cost"
                    value={projectAmount}
                    type="number"
                    id="phone"
                    //   @ts-ignore
                    onChange={(event: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setProjectAmount(event.target.value as number);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Project Status</FormLabel>

                  <Select
                    value={projectStatus}
                    id="status"
                    onChange={(event: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      setProjectStatus(event.target.value);
                    }}>
                    <option value="Not Started"> Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Select>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Client </FormLabel>

                  <Select
                    value={clientId}
                    id="clientId"
                    onChange={(event: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      setClientID(event.target.value);
                    }}>
                    <>
                      <option value="Not Started"> Select Client</option>
                      {data?.clients.map((client: IClient) => {
                        return (
                          <>
                            <option value={client.id}> {client.name}</option>
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
                    onChange={(event: {
                      target: { value: SetStateAction<string> };
                    }) => {
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
                    console.log("SAVE");
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
