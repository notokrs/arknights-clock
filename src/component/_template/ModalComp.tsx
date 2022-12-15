import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
} from '@chakra-ui/react';

interface ModalProps {
  title: string;
  body: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

function ModalComp({...props}: ModalProps) {
  return (
    <Box pos="absolute">
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent mb={3}>
          <ModalHeader>
            <Text className="title">{props.title}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.body}</ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalComp;
