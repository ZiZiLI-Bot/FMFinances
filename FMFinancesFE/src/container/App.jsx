import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../constants/router.constants';
import AuthStorage from '../helper/AuthStorage';
import { loginWithJWT } from '../reducers/user.reducers';

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
      }
    }
  }, []);
  // return userLogin ? <HomePage /> : <LoadingScreen />;
  return <HomePage />;
}

const HomePage = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box m={2}>
      <HStack ml={3} mt={6} spacing={4}>
        <Avatar name={user.username} src={user.avatar} />
        <Text fontSize='3xl' fontWeight='hairline'>
          Hi {user.username}!
        </Text>
        <Box p={2} bgColor='gray.500'>
          <AiOutlineMenuUnfold size={40} color='#000' />
        </Box>
      </HStack>
    </Box>
  );
};

export default App;
