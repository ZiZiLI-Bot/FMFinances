import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../constants/router.constants';
import AuthStorage from '../../helper/AuthStorage';
import { googleLogin } from '../../reducers/user.reducers';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handlerLoginGoogle = async () => {
    await dispatch(googleLogin());
    navigate(ROUTER.HOME);
  };
  useEffect(() => {
    if (AuthStorage.getKey('token')) {
      navigate(ROUTER.HOME);
    }
  }, []);
  return (
    <Box>
      <Text fontSize='4xl' fontWeight='600' textAlign='center' mt={44}>
        Đăng nhập
      </Text>
      <Text textAlign='center' mt={7} textColor='#888'>
        Chọn một trong các phương thức đăng nhập sau:
      </Text>
      <VStack spacing={5} mt={16}>
        <Button
          w={260}
          onClick={handlerLoginGoogle}
          leftIcon={<FaGoogle size={20} />}
          colorScheme='messenger'
          // variant='outline'
          isLoading={user.isLoading}
          loadingText='Đang sử lý'
        >
          <Text>Đăng nhập bằng Google</Text>
        </Button>
        <Button
          w={260}
          isLoading={user.isLoading}
          loadingText='Đang sử lý'
          leftIcon={<FaFacebookSquare size={20} />}
          colorScheme='facebook'
          // variant='outline'
        >
          Đăng nhập bằng Facebook
        </Button>
      </VStack>
    </Box>
  );
}
