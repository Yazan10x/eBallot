import * as React from "react"
import {
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
    ModalContent, ModalBody, ModalFooter, ModalCloseButton, useDisclosure
} from "@chakra-ui/react"
import {BiExpand, BiParagraph, BiStop, FaGithub, FaLinkedin, FaStop, GrDocumentUpdate, GrUpdate, MdUpdate} from "react-icons/all";
import {useParams} from "react-router-dom";
import {UsersAPI} from "../../APIs/UsersAPI";
import {ObjectID} from "bson";
import {useEffect, useState} from "react";
import {User} from "../../Models/User";
import {ArrowForwardIcon, EditIcon, LockIcon} from "@chakra-ui/icons";

export const UserDashboard = () => {

    let {user_id} = useParams();
    const [user, setUser] = useState<User>();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2
} = useDisclosure()

    const get_user = () => {
        UsersAPI.get_user(ObjectID.createFromHexString(user_id!))
            .then((res) => {
                let data = res!
                setUser(data)
            })
    }

    useEffect(() => {
        get_user();
    }, [])

    return (
        <Center py={6}>
            <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}>
                <Flex justify={'center'} mt={12}>
                    <Avatar
                        size={'xxxl'}
                        src={user?.profile.first_name}
                        css={{
                            border: '2px solid white',
                        }}
                    />
                </Flex>

                <Box p={6}>
                    <VStack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {user?.profile.first_name + " " + user?.profile.last_name}
                        </Heading>
                        <Text color={'gray.500'}>{user?.profile.email}</Text>
                        <Spacer></Spacer>
                    </VStack>
                    <Center>
                        <HStack align={"stretch"} alignItems={'center'}>
                            <VStack width={"300px"} divider={<StackDivider />} spacing='6'>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Position
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.first_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Username
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                  {user?.profile.first_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Blood type
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.first_name}
                                </Text>
                              </Box>
                            </VStack>
                            <Spacer width={"30px"}></Spacer>
                            <VStack width={"300px"} divider={<StackDivider />} spacing='6'>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Age
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.first_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  race
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                  {user?.profile.first_name}
                                </Text>
                              </Box>
                              <Box>
                                <Heading size='m' textTransform='uppercase'>
                                  Sex
                                </Heading>
                                <Text pt='2' fontSize='s'>
                                    {user?.profile.first_name}
                                </Text>
                              </Box>
                            </VStack>
                        </HStack>
                    </Center>
                    <Spacer height={"30px"}></Spacer>
                    <HStack>

                        <Button leftIcon={<EditIcon/>} onClick={onOpen2}>
                            <Modal isOpen={isOpen2} onClose={onClose2}>
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>Unauthorized Access :: Admin Permission Required</ModalHeader>
                                  <ModalCloseButton />
                                    <ModalBody>
                                        You need to be an admin to access this page
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose2}>
                                      Close
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                        </Button>
                        <Button leftIcon={<ArrowForwardIcon/>}>
                            <Link href={"/health_report"}>View Medical Record</Link>
                        </Button>
                        <Spacer></Spacer>
                        <Button leftIcon={<BiExpand></BiExpand>} onClick={onOpen}>
                            Biography
                        </Button>
                        <Button leftIcon={<LockIcon></LockIcon>}>
                            <Link href={"/incident_report"}>File A Report</Link>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                  <ModalHeader>Biography</ModalHeader>
                                  <ModalCloseButton />
                                    <ModalBody>
                                        {user?.profile.first_name}
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                      Close
                                    </Button>
                                  </ModalFooter>
                                </ModalContent>
                              </Modal>
                        </Button>


                    </HStack>
                </Box>
            </Box>
        </Center>
    )
    }
