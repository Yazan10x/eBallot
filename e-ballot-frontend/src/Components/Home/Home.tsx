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
  ModalCloseButton, Stack, Skeleton, useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {UsersAPI} from "../../APIs/UsersAPI";
import {CURRENT_URL} from "../../APIs/0_FLASK_API";
import {useNavigate} from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { UserData } from './userData';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export const Home = () => {
  let navigate = useNavigate();
  const toast = useToast()
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [is_picture_taken, set_is_picture_taken] = React.useState<boolean>(false)
  const finalRef = React.useRef(null);
  const webcamRef = React.useRef(null);

  const handleViewAccountClick = () => {
    onOpen();
  };

  const handleCloseWebCam = () => {
    onClose();
    set_is_picture_taken(false)
    setScreenshot(null)
  }

  const authenticate_user = async (img: string) => {

    UsersAPI.authenticate_user(img!).then((res) => {
      let auth_res = res!;
      console.log("Initial Contact")
        console.log(res)
      if (auth_res.success === true) {
        navigate("/citizens/" + auth_res.user_id!)
      } else {
        console.log("Picture Error")
        console.log(res)
        handleCloseWebCam()
        toast({
                title: 'Error.',
                description: "Please try again",
                status: 'error',
                duration: 5000,
                isClosable: true,
              })
      }
    })
        .catch((err) => {
          console.log("Catch Error")
          console.log(err)
          handleCloseWebCam()
          toast({
                  title: 'Error.',
                  description: "Please try again",
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
        })
  }

  const handleCaptureClick = React.useCallback( async () => {
    if (webcamRef.current) {
      // @ts-ignore
      const img = webcamRef.current.getScreenshot();
      // setScreenshot(screenshot);
      authenticate_user(img!).then()
      set_is_picture_taken(true)

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
            Your Vote. Your Future.<br />
            <Text as={'span'} color={'red.400'}>
            Face Authenticated.
            </Text>
          </Heading>
          <Spacer />
          <VStack>
            <Text color={"gray.500"}>
              <Heading>
                <Button
                    colorScheme="red"
                    bgGradient="linear(to-r, red.400, red.500, red.600)"
                    color="white"
                    variant="solid"
                    size={"lg"}
                    onClick={handleViewAccountClick}
                    >
                    Vote Now
                </Button>
              </Heading>
            </Text>
          </VStack>
          <VStack>
            {showWebcam && <Webcam videoConstraints={{ width: 640, height: 480 }} screenshotFormat="image/jpeg" ref={webcamRef}></Webcam>}
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
              <Button
                  colorScheme="red"
                  bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                  color="white"
                  variant="solid"
                  onClick={handleCloseWebCam}>
                Close
              </Button>
              <Spacer></Spacer>
              <Button
                  colorScheme="red"
                  bgGradient="linear(to-r, red.400, red.500, red.600)"
                  color="white"
                  variant="solid"
                  onClick={handleCaptureClick}
                  isDisabled={is_picture_taken}
                  isLoading={is_picture_taken}
              >
                Capture ID
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Chart />
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
