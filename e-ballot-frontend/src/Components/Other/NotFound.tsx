import * as React from "react"
import { Box, Heading, Text, Button, Center, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    let navigate = useNavigate()

    const handle_home = () => {
        navigate("/");
    }

  return (
      <Container>
      <Center>
        <Box textAlign="center" py={10} px={6}>
        <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, red.400, red.600)"
            backgroundClip="text">
            404
        </Heading>
        <Text fontSize="26px" mt={3} mb={2}>
            Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
            The page you're looking for does not seem to exist
        </Text>

        <Button
            colorScheme="red"
            bgGradient="linear(to-r, red.400, red.500, red.600)"
            color="white"
            variant="solid"
            onClick={handle_home}
            >
            Go to Home
        </Button>
        </Box>
    </Center>
    </Container>
  );
}
