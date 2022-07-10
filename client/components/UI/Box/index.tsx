import React from "react";
import { Stack, Text, Button, useDisclosure } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { IClient } from "../../../contants/types";
import { DeleteCustomerModal } from "../../modals";

const ClientBox = ({ email, name, phone, clientNote }: IClient) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack p="4" boxShadow="lg" m="4" borderRadius="md">
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">{name}</Text>
          <FaRegUser />
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between">
          <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
            {clientNote === null || clientNote === undefined
              ? "No notes provided"
              : clientNote}
          </Text>

          <Stack direction={{ base: "column", md: "row" }}>
            <Button variant="outline" colorScheme="green">
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => onOpen()}>
              Remove
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <DeleteCustomerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        name={name}
      />
    </>
  );
};

export default ClientBox;
