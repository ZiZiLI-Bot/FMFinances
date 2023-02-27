import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { AiOutlineMenuUnfold, AiOutlinePlus } from 'react-icons/ai';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/router.constants';
import AuthStorage from '../helper/AuthStorage';
import { loginWithJWT } from '../reducers/user.reducers';
import LoadingScreen from '../components/LoadingScreen';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (!userLogin) {
      if (!AuthStorage.getKey('token')) {
        navigate(ROUTER.LOGIN);
      } else {
        dispatch(loginWithJWT());
        if (!AuthStorage.getKey('homeId')) {
          navigate(ROUTER.SELECT_HOME);
        }
      }
    }
  }, []);
  return userLogin ? <HomePage dispatch={dispatch} navigate={navigate} /> : <LoadingScreen />;
  // return <HomePage />;
}

const HomePage = ({ dispatch, navigate }) => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = useRef();
  return (
    <Box>
      <Flex m={2} alignItems='end' justifyContent='space-between'>
        <HStack ml={3} mt={6} spacing={4}>
          <Avatar name={user.username} src={user.avatar} size='lg' />
          <Text fontSize='2xl' fontWeight='500'>
            {user.username}!
          </Text>
        </HStack>
        <Box ref={btnRef} mb={2} mr={2} onClick={onOpen} p={2} bgColor='gray.500' borderRadius={12}>
          <AiOutlineMenuUnfold size={37} color='#000' />
        </Box>
      </Flex>
      <Flex justifyContent='center' mt={8} p={2}>
        <Button variant='outline' color='green' rightIcon={<AiOutlinePlus size={20} />}>
          Tạo mới hóa đơn chung
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Box>Content</Box>
          </DrawerBody>
          <DrawerFooter>
            <Flex alignItems='center' mr={3}>
              <MdLightMode />
              <Text>/</Text>
              <MdDarkMode />
            </Flex>
            <Switch size='md' isChecked={colorMode === 'light' ? false : true} onChange={(e) => toggleColorMode()} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default App;
