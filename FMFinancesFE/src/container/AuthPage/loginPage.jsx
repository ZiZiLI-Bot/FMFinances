import { Box, Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../../reducers/user.reducers';

export default function LoginPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
          onClick={() => dispatch(googleLogin())}
          leftIcon={<FaGoogle size={20} />}
          colorScheme='whatsapp'
          variant='outline'
          isLoading={user.isLoading}
          loadingText='Đang sử lý'
        >
          Đăng nhập bằng Google
        </Button>
        <Button
          w={260}
          isLoading={user.isLoading}
          loadingText='Đang sử lý'
          leftIcon={<FaFacebookSquare size={20} />}
          colorScheme='linkedin'
          variant='outline'
        >
          Đăng nhập bằng Facebook
        </Button>
      </VStack>
    </Box>
  );
}
