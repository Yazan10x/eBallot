import * as React from "react";
import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Image,
  Stack,
  useColorModeValue,
  VStack,
  Text,
  Button,
  Heading,
  HStack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  Spacer,
  StackDivider,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useTagStyles, useToast,
} from "@chakra-ui/react";
import {
  BiExpand,
  BiParagraph,
  BiStop,
  FaGithub,
  FaLinkedin,
  FaStop,
  GrDocumentUpdate,
  GrUpdate,
  MdUpdate,
} from "react-icons/all";
import { useParams } from "react-router-dom";
import { UsersAPI } from "../../APIs/UsersAPI";
import { ElectionAPI } from "../../APIs/ElectionAPI";
import { ObjectID } from "bson";
import { useEffect, useState } from "react";
import { User } from "../../Models/User";
import { Party } from "../../Models/Party";
import { ArrowForwardIcon, EditIcon, LockIcon } from "@chakra-ui/icons";
import {PartyAPI} from "../../APIs/PartyAPI";

export const UserDashboard = () => {
  const toast = useToast()
  let { user_id } = useParams();
  const [user, setUser] = useState<User>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [party, setParty] = useState<Party | undefined>(undefined);

  const get_user = () => {
    UsersAPI.get_user(ObjectID.createFromHexString(user_id!)).then((res) => {
      let data = res!;
      setUser(data);
    });
  };

  const get_party = (party_id: ObjectID) => {
    PartyAPI.get_party(party_id).then((res) => {
      setParty(res!)
      console.log("Yazan")
      console.log(party)

    })
  }

  const get_user_voted_party = (user_id: ObjectID) => {
    ElectionAPI.did_user_vote(user_id).then((res) => {
      let data = res!;
      if (data.success === true) {
        get_party(data.party_id!)
      }
    });
  };

  const handle_vote = (party_name: string) => {
    ElectionAPI.vote(ObjectID.createFromHexString(user_id!), party_name)
        .then(() => {
          onClose();
          toast({
            title: 'Success.',
            description: "Successfully Voted for " + party_name + "!",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          get_user_voted_party(ObjectID.createFromHexString(user_id!));
      }
    );
  };

  useEffect(() => {
    get_user();
    get_user_voted_party(ObjectID.createFromHexString(user_id!));
  }, []);

  return (
    <Flex direction="column" alignItems="center" py={6}>
      <Alert status="success" variant="subtle" mb={5}>
        <AlertIcon />
        Authenticated Successfully!
      </Alert>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"} mt={12}>
          <Image
            width={"500px"}
            src={user?.profile.id1}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <VStack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user?.profile.first_name + " " + user?.profile.last_name}
            </Heading>
            <Text color={"gray.500"}>{user?.profile.email}</Text>
            <Spacer></Spacer>
          </VStack>
          <Center>
            <HStack align={"stretch"} alignItems={"center"}>
              <Box>
                <Heading size="m" textTransform="uppercase">
                  Date of Birth
                </Heading>
                <Text pt="2" fontSize="s">
                  {user?.profile.dob.toDateString().slice(4)}
                </Text>
              </Box>
              <Spacer width={"80px"}></Spacer>
              <Box>
                <Heading size="m" textTransform="uppercase">
                  Province
                </Heading>
                <Text pt="2" fontSize="s">
                  {user?.province.toUpperCase()}
                </Text>
              </Box>
              <Spacer width={"80px"}></Spacer>
              <Box>
                <Heading size="m" textTransform="uppercase">
                  Gender
                </Heading>
                <Text pt="2" fontSize="s">
                  {user?.profile.gender}
                </Text>
              </Box>
            </HStack>
          </Center>
          <Spacer height={"80px"}></Spacer>
          <Center></Center>
          <Center>
            {
              party ?
                <Center>
                  <Alert status="success" variant="subtle" maxW={"500px"}>
                    <Center>
                      Voted for {party!.name}
                    </Center>
                  </Alert>
                </Center>
             :
              <Button
                colorScheme="red"
                bgGradient="linear(to-r, red.400, red.500, red.600)"
                color="white"
                variant="solid"
                onClick={onOpen}
                size={"lg"}
              >
                Vote
              </Button>
            }

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent height={"300px"}>
                <ModalHeader>Vote Party</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" justifyContent="space-around">
                  <VStack>
                    <Spacer></Spacer>
                    <HStack>
                      <Button height={20} width={150} colorScheme="red" size={"lg"}
                        onClick={() => {handle_vote("Liberal")}}
                      >
                        Liberal
                      </Button>
                      <Button height={20} width={150} colorScheme="blue" size={"lg"}
                        onClick={() => {handle_vote("Conservative")}}
                      >
                        Conservative
                      </Button>
                    </HStack>
                    <Spacer></Spacer>
                  </VStack>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
          </Center>
        </Box>
      </Box>
    </Flex>
  );
};
