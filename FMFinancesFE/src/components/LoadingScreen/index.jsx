import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../../assets/Lotties/loading.json';

export default function LoadingScreen() {
  return (
    <Flex height={96} flexDirection='column' alignItems='center' justifyContent='center'>
      <Text my={10} fontSize={22}>
        Đang sử lý ...
      </Text>
      <Spinner thickness='5px' speed='0.5s' emptyColor='gray.200' size='xl' color='green.600' />
      {/* <Lottie width={200} height={200} options={{ loop: true, autoplay: true, animationData: loadingAnimation }} /> */}
    </Flex>
  );
}
