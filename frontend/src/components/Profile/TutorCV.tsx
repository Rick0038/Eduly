import { useState } from 'react';
import { FileInput, Button, Anchor, Text } from '@mantine/core';
import { IconEye, IconFileCv, IconUpload } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { tutorService } from '../../service';
import { Tutor } from '../../model';
import { notificationService } from '../../service/NotificationService';

interface TutorCVProps {
  tutor: Tutor;
  isEditing: boolean;
  handleEditToggle: () => void;
}

export function TutorCV(props: TutorCVProps) {
  const { tutor, isEditing, handleEditToggle } = props;
  const [cvFile, setCvFile] = useState<File | null>(null);

  const updateCV = useMutation({
    mutationFn: tutorService.updateCV,
    onSuccess: () => {
      notificationService.showSuccess({ message: 'CV sent for approval!' });
      handleEditToggle();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const handleCVUpload = () => {
    if (!cvFile) return;
    const formData = new FormData();
    formData.append('file', cvFile);
    updateCV.mutate(formData);
  };

  return (
    <div className='grid gap-4'>
      {tutor.cv && tutor.cv?.link?.length ? (
        <div className='flex flex-col gap-2 justify-start content-start text-left'>
          <Text>Your CV:</Text>
          <div className='relative group max-w-[400px]'>
            <Anchor
              href={tutor.cv.link}
              target='_blank'
              rel='noopener noreferrer'
              className='block'
            >
              <img
                src='/pdf-thumbnail.jpg'
                alt='CV Thumbnail'
                className='w-full h-auto'
              />
              <div className='absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center'>
                <IconEye size={48} color='white' />
              </div>
            </Anchor>
          </div>
        </div>
      ) : (
        <Text className='text-center text-red-500'>CV not uploaded!</Text>
      )}

      {isEditing && (
        <FileInput
          label='Attach your CV'
          placeholder='Upload your CV'
          rightSection={<IconFileCv />}
          accept='application/pdf'
          onChange={setCvFile}
        />
      )}

      {isEditing && (
        <Button onClick={handleCVUpload} leftSection={<IconUpload />}>
          Upload CV
        </Button>
      )}
    </div>
  );
}
