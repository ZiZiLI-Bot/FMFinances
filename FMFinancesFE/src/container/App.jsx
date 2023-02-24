import { Box, Button, Text, useColorMode } from '@chakra-ui/react';
import LoadingScreen from '../components/LoadingScreen';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <LoadingScreen />
    </Box>
  );
}

export default App;
