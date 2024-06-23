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
import { Tutor } from '../../model';

interface ProfileHeadProps {
  isEditing: boolean;
  user: Tutor;
  handleEditToggle: () => void;
}

export function ProfileHead(props: ProfileHeadProps) {
  const { isEditing, user, handleEditToggle } = props;

  const handleAvatarChange = (file: File | null) => {
    if (!file) return;
    console.log('>> file', file);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   console.log('>> reader', reader.result, file);
    // };
    // reader.readAsDataURL(file);
  };

  return (
    <div className='profile-header flex items-center mb-4'>
      <div className='relative'>
        <Avatar
          src={user.profileImgLink?.link || ''}
          alt={`${user.firstName} ${user.lastName}`}
          size='xl'
          className='mr-4'
        />
        {isEditing && (
          <FileButton onChange={handleAvatarChange} accept='image/*'>
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
        <StatusBadge status={user.status} />
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

const StatusBadge = (props: { status: string }) => {
  switch (props.status) {
    case 'APPROVED':
      return <Badge color='green'>Approved</Badge>;
    case 'PENDING':
      return <Badge color='yellow'>Pending</Badge>;
    case 'REJECTED':
      return <Badge color='red'>Rejected</Badge>;
    default:
      return null;
  }
};
