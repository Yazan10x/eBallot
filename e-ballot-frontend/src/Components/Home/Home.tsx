import {
  Box,
  Heading,
  Container,
  Text,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { UserData } from './userData';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

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
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Together we Vote, <br />
            <Text as={'span'} color={'red.400'}>
              Inclusivity!
            </Text>
          </Heading>
          <Spacer />
          <VStack>
            <Text color={'gray.500'}>
              <Heading>About us</Heading>
              <Text>Text</Text>
            </Text>
          </VStack>
          <Chart />
        </VStack>
      </Container>
    </>
  );
};
