import {
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { theme } from "../../../utils/theme";
import React from "react";
import { IClient } from "../../../contants/types";
interface ICientDetailsModal {
  isOpen: boolean;
  onClose: () => void;
  clientData: IClient;
}
const ClientDetailsModal = ({
  onClose,
  isOpen,
  clientData,
}: ICientDetailsModal) => {
  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignItems={"center"} textAlign={"center"}>
          {clientData.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>Email: {clientData.email}</ListItem>
            <ListItem>Phone:{clientData.phone}</ListItem>
            <ListItem>Client Note : {clientData.clientNote}</ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            bg={theme.Color.secondary}
            _hover={{
              bg: theme.Color.tertiary,
            }}
            colorScheme={"whiteAlpha"}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClientDetailsModal;
