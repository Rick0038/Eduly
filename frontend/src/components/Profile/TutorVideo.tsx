import { useState } from 'react';
import { FileInput, Button, Text, Badge } from '@mantine/core';
import { IconUpload, IconVideo } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { tutorService } from '../../service';
import { Tutor } from '../../model';
import { notificationService } from '../../service/NotificationService';
import { getContentStatusColor } from '../../util/helpers';

interface TutorVideoProps {
  tutor: Tutor;
  isEditing: boolean;
  handleEditToggle: () => void;
}

export function TutorVideo(props: TutorVideoProps) {
  const { tutor, isEditing, handleEditToggle } = props;
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const updateVideo = useMutation({
    mutationFn: tutorService.updateVideo,
    onSuccess: () => {
      notificationService.showSuccess({ message: 'Video sent for approval!' });
      handleEditToggle();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const handleVideoUpload = () => {
    if (!videoFile) return;
    const formData = new FormData();
    formData.append('file', videoFile);
    updateVideo.mutate(formData);
  };

  return (
    <div className='grid gap-4'>
      {tutor.video && tutor.video?.link?.length ? (
        <div className='flex flex-col gap-2 justify-start content-start text-left'>
          <div className='flex gap-2 items-center'>
            <Text>Your Video:</Text>
            <Badge color={getContentStatusColor(tutor.cv?.status)}>
              {tutor.cv?.status}
            </Badge>
          </div>
          <video controls disablePictureInPicture className='max-w-[600px]'>
            <source src={tutor.video.link} type='video/mp4'></source>
          </video>
        </div>
      ) : (
        <Text className='text-center' c='red'>
          Video not uploaded!
        </Text>
      )}

      {isEditing && (
        <FileInput
          label='Attach your Video'
          placeholder='Upload your Video'
          rightSection={<IconVideo />}
          accept='video/mp4'
          onChange={setVideoFile}
        />
      )}

      {isEditing && (
        <Button onClick={handleVideoUpload} leftSection={<IconUpload />}>
          Upload Video
        </Button>
      )}
    </div>
  );
}
