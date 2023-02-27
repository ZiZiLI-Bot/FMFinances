import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import HomeApi from '../../../API/Home.api';
import AuthStorage from '../../../helper/AuthStorage';
import UploadFile from '../../../helper/UploadFile';

const noImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';

export default function NewHomeModal({ onClose }) {
  const [newHomeName, setNewHomeName] = React.useState('');
  const [joinKey, setJoinKey] = React.useState('');
  const [avatar, setAvatar] = React.useState({
    url: noImage,
  });
  const [loading, setLoading] = React.useState(false);
  const [createSuccess, setCreateSuccess] = React.useState(false);
  const handlerChangeAvatar = (e) => {
    const image = {
      file: e.target.files[0],
      url: URL.createObjectURL(e.target.files[0]),
    };
    setAvatar(image);
  };

  const handlerSubmit = async () => {
    let urlAvatar;
    setLoading(true);
    if (!!avatar.file) {
      urlAvatar = await UploadFile(avatar.file);
    }
    const data = {
      name: newHomeName,
      joinId: joinKey,
      avatar: urlAvatar ? urlAvatar[0] : noImage,
      uidCall: AuthStorage.getKey('uid'),
    };
    const response = await HomeApi.createHome(data);
    if (response.success) {
      setCreateSuccess(true);
    }
  };
  return (
    <Box h={430}>
      <ModalHeader>Tạo nhà mới:</ModalHeader>
      <ModalCloseButton />
      {!loading ? (
        <>
          <ModalBody>
            <Flex justifyContent='center' my={5} position='relative'>
              <Box bgColor='gray.300' p={1} borderRadius={6} position='absolute' zIndex={10} bottom={0} ml={16}>
                <AiFillEdit color='#000' />
              </Box>
              <Avatar size='xl' zIndex={1} src={avatar.url} />
              <input
                type='file'
                onChange={(e) => handlerChangeAvatar(e)}
                style={{ width: 100, position: 'absolute', zIndex: 11, height: 90, opacity: 0 }}
              />
            </Flex>
            <VStack spacing={5}>
              <Input placeholder='Nhập tên nhà mới:' onChange={(e) => setNewHomeName(e.target.value)} />
              <Input placeholder='Mã truy cập:' onChange={(e) => setJoinKey(e.target.value)} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlerSubmit} colorScheme='blue' mr={3}>
              Tạo
            </Button>
            <Button onClick={onClose} variant='ghost'>
              Đóng
            </Button>
          </ModalFooter>
        </>
      ) : (
        <Flex alignItems='center' justifyContent='center' flexDir='column' h={430}>
          {!createSuccess ? (
            <>
              <Text fontSize={'3xl'} textAlign='center' px={3}>
                Đang khởi tạo nhà mới!
              </Text>
              <Spinner mt={16} />
            </>
          ) : (
            <Box>
              <Text textAlign='center' px={3}>
                Khởi tạo thành công! Bạn có thể thêm thành viên vào nhà bằng cách chia sẻ mã truy cập cho họ.
              </Text>
              <ModalFooter>
                <Button onClick={onClose} variant='solid'>
                  Đóng
                </Button>
              </ModalFooter>
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
}
