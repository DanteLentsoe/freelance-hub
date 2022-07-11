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
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { addClientModal } from "../../../store/atoms";
import { theme } from "../../../utils/theme";

const AddClientModal = () => {
  const [isAddModalOpen, setCloseAddModal] = useRecoilState(addClientModal);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
            Add Client
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Client Name/s</FormLabel>
              <Input ref={initialRef} placeholder="Client name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Client Email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input placeholder="Client Phone Number" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={theme.Color.secondary}
              color={"white"}
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClientModal;
