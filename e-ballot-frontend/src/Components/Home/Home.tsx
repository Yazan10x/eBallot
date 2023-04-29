import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon, Link,
  Avatar,
  chakra,
  Flex,
  SimpleGrid, Spacer, VStack, StackDivider,
} from '@chakra-ui/react';
import {FaDiscord, FaGithub} from "react-icons/all";
import * as React from "react";

export const Home = () => {
  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Home</title>
      </header>

      <Container maxW={'3xl'}>
        <VStack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Together we Vote, <br />
            <Text as={'span'} color={'red.400'}>
              Inclusivity!
            </Text>
          </Heading>
          <Spacer></Spacer>
        <VStack>
          <Text color={'gray.500'}>
            <Heading>
              About us
            </Heading>
            <Text>
              Text
            </Text>
          </Text>
        </VStack>

        </VStack>
      </Container>
    </>
  );
}
