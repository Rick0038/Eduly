import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import { FC } from 'react';

export const VideoViewer: FC<{ url: string }> = ({ url }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title='Intro Video' centered>
        <video controls disablePictureInPicture>
          <source src={url} type='video/mp4'></source>
        </video>
      </Modal>
      <Button
        onClick={open}
        variant='light'
        leftSection={<IconPlayerPlayFilled />}
      >
        Watch Video
      </Button>
    </>
  );
};
