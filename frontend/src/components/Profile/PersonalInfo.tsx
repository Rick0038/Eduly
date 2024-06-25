import {
  Anchor,
  Button,
  MultiSelect,
  NumberInput,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { Tutor } from '../../model';
import { IconCheck } from '@tabler/icons-react';
import { languages, topics } from '../../util/constants';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { notificationService } from '../../service/NotificationService';
import { tutorService } from '../../service';

interface PersonalInfoProps {
  isEditing: boolean;
  user: Tutor;
  handleEditToggle: () => void;
}

export function PersonalInfo(props: PersonalInfoProps) {
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
      <div className='flex gap-1'>
        <strong>Pricing: </strong>
        <Text>{user.pricing}</Text>
      </div>
      <div className='flex gap-1'>
        <strong>Topic: </strong>
        <Text>{user.topic.join(', ')}</Text>
      </div>
      <div className='flex gap-1'>
        <strong>Language: </strong>
        <Text>{user.language}</Text>
      </div>
      <div>
        <strong>Introduction: </strong>
        {user.intro}
      </div>
      <div className='flex gap-1'>
        <strong>Meeting Link: </strong>
        <Anchor
          href={user.bbbLink}
          target='_blank'
          rel='noopener noreferrer'
          ml={4}
        >
          {user.bbbLink}
        </Anchor>
      </div>
    </div>
  );
}

export function EditPersonalInfo(props: Omit<PersonalInfoProps, 'isEditing'>) {
  const { user, handleEditToggle } = props;
  const updateProfile = useMutation({
    mutationFn: tutorService.updateProfile,
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

  const handleSubmit = (values: Tutor) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      topics: values.topic,
      language: values.language,
      bbbLink: values.bbbLink,
      intro: values.intro,
      pricing: values.pricing,
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
        <NumberInput
          label='Pricing'
          name='pricing'
          prefix='€'
          placeholder='Your rice per hour'
          required
          key={form.key('pricing')}
          {...form.getInputProps('pricing')}
        />
        <MultiSelect
          label='Topic'
          name='topic'
          placeholder='Select topic you teach'
          data={topics}
          required
          key={form.key('topic')}
          {...form.getInputProps('topic')}
        />
        <Select
          label='Language'
          name='language'
          placeholder='Select language'
          data={languages}
          required
          key={form.key('language')}
          {...form.getInputProps('language')}
        />
        <Textarea
          label='Introduction'
          name='introText'
          placeholder='Enter your introduction text'
          required
          autosize
          minRows={5}
          key={form.key('introText')}
          {...form.getInputProps('introText')}
        />
        <TextInput
          label='BBB Link'
          name='bbbLink'
          placeholder='Enter bbb link'
          required
          key={form.key('bbbLink')}
          {...form.getInputProps('bbbLink')}
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
