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
} from "@chakra-ui/react";
import { SetStateAction, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { addClientModal } from "../../../store/atoms";
import { theme } from "../../../utils/theme";

const AddProjectModal = () => {
  const [isAddModalOpen, setCloseAddModal] = useRecoilState(addClientModal);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userNotes, setUserNotes] = useState("");

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const onSubmitHandler = (event: any) => {
    event.preventDefault();
    console.log("VALUE ", userName, userPhone, userEmail, userNotes);
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isAddModalOpen}
        onClose={() => {
          setCloseAddModal(false);
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
                <FormLabel>Project Names</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Project name"
                  value={userName}
                  id="name"
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setUserName(event.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Project</FormLabel>
                <Input
                  placeholder="Client Email"
                  value={userEmail}
                  id="email"
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setUserEmail(event.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input
                  placeholder="Cost"
                  value={userPhone}
                  id="phone"
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setUserPhone(event.target.value);
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Notes</FormLabel>
                <Input
                  placeholder="Client Notes"
                  id="notes"
                  value={userNotes}
                  h={100}
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setUserNotes(event.target.value);
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
                  setCloseAddModal(false);
                }}>
                Save
              </Button>
              <Button
                onClick={() => {
                  setCloseAddModal(false);
                }}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProjectModal;
