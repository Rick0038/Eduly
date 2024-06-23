import { useState } from 'react';
import { FileInput, Button, Anchor, Text } from '@mantine/core';
import { IconFileCv, IconUpload } from '@tabler/icons-react';
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

  const getFileNameFromURL = (url: string) => {
    return url.split('/').pop();
  };

  return (
    <div className='grid gap-4'>
      {tutor.cv && tutor.cv.link ? (
        <div className='flex gap-2'>
          <Text>Your CV:</Text>
          <Anchor
            href={tutor.cv.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            {getFileNameFromURL(tutor.cv.link)}
          </Anchor>
        </div>
      ) : (
        <Text className='text-center' c='red'>
          No CV found!
        </Text>
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
