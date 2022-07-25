import {
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { IClient } from "../../contants/types";

interface PackageTierProps {
  title: string;
  value: string;
  checked?: boolean;
}
const PackageTier = ({ title, value }: PackageTierProps) => {
  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-start",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}>
      <Heading size={"sm"}>{title}</Heading>

      <Text size={"sm"}>{value}</Text>
    </Stack>
  );
};

interface IClientProjectCard {
  projectNotes?: string;
  projectStatus?: string;
  amount?: string;
  clientData?: IClient;
}
const ClientProjectCard = ({
  amount,
  clientData,
  projectNotes,
  projectStatus,
}: IClientProjectCard) => {
  return (
    <Box py={6} px={5} minW={"100vh"}>
      <Stack spacing={4} width={"100%"} direction={"column"}>
        <Stack
          p={5}
          alignItems={"center"}
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}>
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign={"center"}>
            <Heading size={"md"}>
              <Text color="purple.400">Notes :</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: "100%",
              md: "60%",
            }}>
            <Text textAlign={"center"}>{projectNotes}</Text>
          </Stack>
        </Stack>
        <Divider />
        {clientData === null ? (
          <Heading size={"md"} textAlign={"center"}>
            <Text>No Client Assigned To Project</Text>
          </Heading>
        ) : (
          <>
            <PackageTier
              title={"Project Status"}
              value={projectStatus as string}
            />
            <Divider />
            <PackageTier
              title={"Amount"}
              checked={true}
              value={amount as string}
            />
            <Divider />
            <PackageTier
              title={"Client Name"}
              value={clientData?.name as string}
            />
            <Divider />
            <PackageTier
              title={"Client Email"}
              value={clientData?.email as string}
            />
            <Divider />

            <PackageTier
              title={"Client Phone"}
              value={clientData?.phone as string}
            />
            <Divider />
            <PackageTier
              title={"Client Notes"}
              value={clientData?.clientNote as string}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ClientProjectCard;
