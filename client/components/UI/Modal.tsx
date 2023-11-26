'use client';

import { useDisclosure } from '@nextui-org/use-disclosure';
import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button, ButtonProps } from '@nextui-org/button';

type Props = {
  title: string;
  body: React.ReactNode;
  buttonOpenProps?: ButtonProps;
  onSubmit?: () => Promise<unknown>;
  actionButtonProps?: ButtonProps;
};

const Modal = (props: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const submitHandler = async () => {
    if (props.onSubmit) await props.onSubmit();
    onClose();
  };
  return (
    <>
      <Button color='primary' {...props.buttonOpenProps} onPress={onOpen}>
        {props.buttonOpenProps?.children || props.title}
      </Button>
      <NextUIModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {props.title}
              </ModalHeader>
              <ModalBody>{props.body}</ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  {...props.actionButtonProps}
                  onPress={submitHandler}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextUIModal>
    </>
  );
};

export default Modal;
