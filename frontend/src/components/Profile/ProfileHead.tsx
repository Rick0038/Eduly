import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  FileButton,
  Rating,
  Title,
} from '@mantine/core';
import { IconEdit, IconPencil, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Tutor } from '../../model';
import { tutorService } from '../../service';
import { notificationService } from '../../service/NotificationService';
import { getProfileStatusColor } from '../../util/helpers';

interface ProfileHeadProps {
  isEditing: boolean;
  user: Tutor;
  handleEditToggle: () => void;
}

export function ProfileHead(props: ProfileHeadProps) {
  const { isEditing, user, handleEditToggle } = props;
  const updateProfileImage = useMutation({
    mutationFn: tutorService.updateProfileImage,
    onSuccess: () => {
      notificationService.showSuccess({ message: 'Image sent for approval!' });
      handleEditToggle();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const handleAvatarChange = (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    updateProfileImage.mutate(formData);
  };

  return (
    <div className='profile-header flex items-center mb-4'>
      <div className='relative'>
        <Avatar
          src={
            (user.profileImgLink as { link: string; status: string })?.link ||
            ''
          }
          alt={`${user.firstName} ${user.lastName}`}
          size='xl'
          className='mr-4'
        />
        {isEditing && (
          <FileButton
            onChange={handleAvatarChange}
            accept='image/png,image/jpeg'
          >
            {(props) => (
              <ActionIcon
                {...props}
                variant='filled'
                size='sm'
                radius='lg'
                className='absolute top-0 right-3 cursor-pointer'
              >
                <IconPencil size={16} />
              </ActionIcon>
            )}
          </FileButton>
        )}
      </div>
      <div className='flex-grow'>
        <Title order={2}>{`${user.firstName} ${user.lastName}`}</Title>
        <Rating value={user.rating} fractions={2} readOnly />
        <p>{`${user.numLessonsTaught} lessons taught`}</p>
        <Badge color={getProfileStatusColor(user.status)}>{user.status}</Badge>
      </div>
      <Button
        onClick={handleEditToggle}
        leftSection={isEditing ? <IconX size={16} /> : <IconEdit size={16} />}
        visibleFrom='sm'
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </Button>
      <Button onClick={handleEditToggle} hiddenFrom='sm' variant='subtle'>
        {isEditing ? <IconX size={16} /> : <IconEdit size={16} />}
      </Button>
    </div>
  );
}
