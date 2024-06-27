import { Button, Text, TextInput } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import { languages } from '../../util/constants';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { notificationService } from '../../service/NotificationService';
import {
  StudentProfileDetail,
  studentService,
} from '../../service/StudentService';

interface PersonalInfoProps {
  isEditing: boolean;
  user: StudentProfileDetail;
  handleEditToggle: () => void;
}

export function StudentPersonalInfo(props: PersonalInfoProps) {
  const { isEditing, user, ...otherProps } = props;

  if (isEditing) {
    return <EditPersonalInfo user={user} {...otherProps} />;
  }

  return (
    <div className='grid gap-4'>
      <div className='flex gap-1'>
        <strong>First Name: </strong>
        <Text>{user.firstName}</Text>
      </div>
      <div className='flex gap-1'>
        <strong>Last Name: </strong>
        <Text>{user.lastName}</Text>
      </div>
      <div className='flex gap-1'>
        <strong>Email: </strong>
        <Text>{user.email}</Text>
      </div>
    </div>
  );
}

export function EditPersonalInfo(props: Omit<PersonalInfoProps, 'isEditing'>) {
  const { user, handleEditToggle } = props;

  const updateProfile = useMutation({
    mutationFn: studentService.updateStudentProfile,
    onSuccess: () => {
      notificationService.showSuccess({ message: 'Profile data updated!' });
      handleEditToggle();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      ...user,
    },
    validate: {
      email: (value) =>
        /^\S+hs-fulda\.de$/.test(value)
          ? null
          : 'Invalid email or domain must be hs-fulda.de',
    },
  });

  const handleSubmit = (values: StudentProfileDetail) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    };
    updateProfile.mutate(data);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className='grid gap-4'>
        <TextInput
          label='First Name'
          name='firstName'
          placeholder='Your first name'
          required
          key={form.key('firstName')}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label='Last Name'
          name='lastName'
          placeholder='Your last name'
          required
          key={form.key('lastName')}
          {...form.getInputProps('lastName')}
        />
        <TextInput
          label='Email'
          name='email'
          placeholder='Your email'
          required
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
      </div>
      <Button
        className='mt-4'
        leftSection={<IconCheck size={16} />}
        type='submit'
        fullWidth
      >
        Update Profile
      </Button>
    </form>
  );
}
