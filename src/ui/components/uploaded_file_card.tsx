import React, { useState } from 'react';
import {
  Box,
  chakra,
  Collapse,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { UploadedFileRM } from '../../model/uploaded-file-r-m';

const UploadedFileCard: React.FC<{
  uploadedFile: UploadedFileRM;
  onDelete?: (id: string) => void;
  onUpdate?: (newTotal: string, savedFileName: string) => void;
}> = ({ uploadedFile, onDelete, onUpdate }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      month: 'short',
      day: 'numeric',
      second: 'numeric',
    });
  };

  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState('xl');

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const handleToggle = () => setShow(!show);
  return (
    <Box maxW="xs" mx="auto" bg={useColorModeValue('white', 'gray.800')} shadow="lg" rounded="lg">
      <Box px={4} py={2}>
        <Tooltip label={uploadedFile.timestamp} placement="top">
          <chakra.h1
            color={useColorModeValue('gray.800', 'white')}
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
          >
            {formatDate(uploadedFile.timestamp)}
          </chakra.h1>
        </Tooltip>

        <Collapse startingHeight={50} in={show} onClick={handleToggle}>
          {show && (
            <Text mt={1} fontSize="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {uploadedFile.text}
            </Text>
          )}
          {!show && (
            <Text
              mt={1}
              fontSize="sm"
              noOfLines={show ? 100 : 2}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {uploadedFile.text}
            </Text>
          )}
        </Collapse>
      </Box>

      <Image
        src={`/backend/${uploadedFile.savedFileName}`}
        alt={`Picture of ${uploadedFile.originalName}`}
        roundedTop="lg"
        w={'100%'}
        onClick={() => handleSizeClick(size)}
      />
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <Image
            src={`/backend/${uploadedFile.savedFileName}`}
            alt={`Picture of ${uploadedFile.originalName}`}
            w={'100%'}
          />
        </ModalContent>
      </Modal>

      <Flex alignItems="center" justifyContent="space-between" px={4} py={2} roundedBottom="lg">
        <Editable
          defaultValue={uploadedFile.total}
          onBlur={() =>
            onUpdate((event.target as HTMLButtonElement)?.value, uploadedFile.savedFileName)
          }
        >
          <EditablePreview />
          <EditableInput />
        </Editable>

        <chakra.button
          onClick={() => onDelete(uploadedFile.savedFileName)}
          px={2}
          py={1}
          bg="white"
          fontSize="xs"
          color="gray.900"
          fontWeight="bold"
          rounded="lg"
          textTransform="uppercase"
          _hover={{
            bg: 'gray.200',
          }}
          _focus={{
            bg: 'gray.400',
          }}
        >
          Delete
        </chakra.button>
      </Flex>
    </Box>
  );
};

export default UploadedFileCard;
