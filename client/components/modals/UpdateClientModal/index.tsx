import { useMutation } from "@apollo/client";
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
import { SetStateAction, useRef, useState, Dispatch } from "react";
import { ADD_CLIENT } from "../../../graphql/mutations/clientMutations";
import { GET_CLIENTS } from "../../../graphql/queries/client";
import { theme } from "../../../utils/theme";

type UpdateClientModal = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  clientNote?: string;
  isUpdateModalOpen: boolean;
  setUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
};

const UpdateClientModal = ({
  id,
  name,
  email,
  clientNote,
  phone,
  isUpdateModalOpen,
  setUpdateModalOpen,
}: UpdateClientModal) => {
  const [userName, setUserName] = useState(name);
  const [userPhone, setUserPhone] = useState(phone);
  const [userEmail, setUserEmail] = useState(email);
  const [userNotes, setUserNotes] = useState(clientNote);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name: userName,
      phone: userPhone,
      email: userEmail,
      clientNote: userNotes,
    },
    refetchQueries: [GET_CLIENTS],
  });

  const onSubmitHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addClient();
    setUserName("");
    setUserPhone("");
    setUserEmail("");
    setUserNotes("");
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
        }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignItems={"center"} textAlign={"center"}>
            Update {name}
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmitHandler}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Client Name/s</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Client name"
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Client Phone Number"
                  value={userPhone}
                  id="phone"
                  onChange={(event: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setUserPhone(event.target.value as string);
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
                    setUserNotes(event.target.value as string);
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
                  setUpdateModalOpen(false);
                }}>
                Save
              </Button>
              <Button
                onClick={() => {
                  setUpdateModalOpen(false);
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

export default UpdateClientModal;
