import { useDisclosure } from '@nextui-org/use-disclosure';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/react';

const CreateForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateForm;
