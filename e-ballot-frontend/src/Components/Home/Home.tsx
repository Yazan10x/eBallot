import * as React from "react";
import Webcam, { WebcamProps } from "react-webcam";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  VStack,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Bar } from 'react-chartjs-2';
import { UserData } from './userData';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export const Home = () => {
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const webcamRef = React.useRef(null);

  const handleViewAccountClick = () => {
    onOpen();
  };

  const handleCaptureClick = React.useCallback(() => {
    if (webcamRef.current) {
      const screenshot = webcamRef.current.getScreenshot();
      setScreenshot(screenshot);
    }
  }, [webcamRef, setScreenshot]);


  return (
    <>
      <header>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>Home</title>
      </header>

      <Container maxW={"3xl"}>
        <VStack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Together we Vote, <br />
            <Text as={"span"} color={"red.400"}>
              Inclusivity!
            </Text>
          </Heading>
          <Spacer />
          <VStack>
            <Text color={"gray.500"}>
              <Heading>
                <Button colorScheme="teal" size="lg" onClick={handleViewAccountClick}>
                  Verify ID
                </Button>
              </Heading>
            </Text>
          </VStack>
          <VStack>
            //@ts-ignore
            {showWebcam && <Webcam videoConstraints={{ width: 640, height: 480 }} screenshotFormat="image/jpeg" ref={webcamRef}> </Webcam>}
            {screenshot && <img src={screenshot} alt="Screenshot" />}
          </VStack>
        </VStack>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Display ID</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Webcam height={480} width={640} screenshotFormat="image/jpeg" ref={webcamRef} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleCaptureClick}>Capture ID</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </>
  );
};

const Chart = () => {


  const data = {
    labels: UserData.map((o) => o.province),
    datasets: [
      {
        label: 'Liberal votes',
        backgroundColor: 'rgba(255, 64, 60)',
        borderColor: 'rgb(0,0,0)',
        borderWidth: 1,
        data: UserData.map((o) => o.liberal),
      },
      {
        label: 'Conservative votes',
        backgroundColor: 'rgba(0, 122, 204)',
        borderColor: 'rgb(0,0,0)',
        borderWidth: 1,
        data: UserData.map((o) => o.conservative),
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
    responsive: true
  };
  return <Bar data={data} options={options}></Bar>;
};
