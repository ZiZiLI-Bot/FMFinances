import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CiHome, CiLogin } from 'react-icons/ci';
import HomeApi from '../../API/Home.api';
import NewHomeModal from '../../components/SelectHome/NewHomeModal';
import AuthStorage from '../../helper/AuthStorage';
import { useNavigate } from 'react-router-dom';

export default function SelectHome() {
  const [HomeList, setHomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(false);
  const [ModalContentElement, setModalContentElement] = useState(<Box></Box>);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigator = useNavigate();

  const closeModal = () => {
    setModalContentElement(<Box></Box>);
    onClose();
    setReset(!reset);
  };

  const openNewHome = () => {
    setModalContentElement(<NewHomeModal onClose={closeModal} />);
    onOpen();
  };

  const handlerSelectHome = (home) => {
    AuthStorage.setKey('homeId', home._id);
    navigator('/');
  };

  useEffect(() => {
    setLoading(true);
    const fetchHomeList = async () => {
      const uid = AuthStorage.getKey('uid');
      try {
        const response = await HomeApi.getAllHomeByUid(uid);

        setHomeList(response.data);
      } catch (error) {
        console.log('Failed to fetch Home list: ', error);
      }
      setLoading(false);
    };
    fetchHomeList();
  }, [reset]);
  return (
    <Box>
      <Text mt={10} textAlign='center' fontSize={23} fontWeight='semibold'>
        Chọn một nhà của bạn!
      </Text>
      <Box>
        {!loading ? (
          <Box h={650} overflow='auto'>
            {HomeList.length > 0 ? (
              <Flex wrap='wrap' spacing={3} mt={10} p={6} w='full'>
                {HomeList.map((home) => (
                  <Box
                    onClick={() => handlerSelectHome(home)}
                    key={home._id}
                    borderRadius={10}
                    m={2}
                    w={40}
                    p={4}
                    h={130}
                    bgColor='gray'
                  >
                    <Flex justifyContent='center'>
                      <Avatar name={home.name} src={home.avatar} />
                    </Flex>
                    <Text textAlign='center' mt={5}>
                      {home.name}
                    </Text>
                  </Box>
                ))}
              </Flex>
            ) : (
              <Flex alignItems='center' justifyContent='center' h='full'>
                <Text textAlign='center' fontSize={22}>
                  Bạn chứa tham gia vào bất kỳ nhà nào!
                </Text>
              </Flex>
            )}
          </Box>
        ) : (
          <Flex alignItems='center' justifyContent='center' w='full' h={600}>
            <Spinner thickness='5px' speed='0.5s' emptyColor='gray.200' size='xl' color='green.600' />
          </Flex>
        )}
      </Box>
      <Flex justifyContent='center'>
        <HStack spacing={3}>
          <Button onClick={openNewHome} leftIcon={<CiHome fontSize={23} />}>
            <Text fontSize={20}>Tạo nhà mới</Text>
          </Button>
          <Button leftIcon={<CiLogin fontSize={23} />}>
            <Text fontSize={20}>Vào nhà mới</Text>
          </Button>
        </HStack>
      </Flex>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>{ModalContentElement}</ModalContent>
      </Modal>
    </Box>
  );
}
