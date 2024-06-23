import {
  Button,
  FileInput,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { Tutor } from '../../model';
import { IconCheck, IconFileCv, IconVideo } from '@tabler/icons-react';
import { languages, topics } from '../../util/constants';
import { useForm } from '@mantine/form';

interface PersonalInfoProps {
  isEditing: boolean;
  user: Tutor;
}

export function PersonalInfo(props: PersonalInfoProps) {
  const { isEditing, user } = props;

  if (isEditing) {
    return <EditPersonalInfo user={user} />;
  }

  return (
    <div className='grid gap-4'>
      <div>
        <strong>First Name: </strong>
        {user.firstName}
      </div>
      <div>
        <strong>Last Name: </strong>
        {user.lastName}
      </div>
      <div>
        <strong>Email: </strong>
        {user.email}
      </div>
      <div>
        <strong>Status: </strong>
        {user.status}
      </div>
      <div>
        <strong>Pricing: </strong>
        {user.pricing}
      </div>
      <div>
        <strong>Topic: </strong>
        {user.topic}
      </div>
      <div>
        <strong>Language: </strong>
        {user.language}
      </div>
      <div>
        <strong>Introduction: </strong>
        {user.introText}
      </div>
      <div>
        <strong>BBB Link: </strong>
        <a href={user.bbbLink} target='_blank' rel='noopener noreferrer'>
          {user.bbbLink}
        </a>
      </div>
    </div>
  );
}

export function EditPersonalInfo(props: Omit<PersonalInfoProps, 'isEditing'>) {
  const { user } = props;
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
    console.log('values', values);
    // TODO: Hit the API
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
        <Select
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
        <FileInput
          label='Attach your CV'
          name='cv'
          placeholder='Upload your CV'
          rightSection={<IconFileCv stroke={1.5} />}
          rightSectionPointerEvents='none'
          accept='application/pdf'
          required
          key={form.key('cv')}
          {...form.getInputProps('cv')}
        />
        <FileInput
          label='Video Upload'
          name='video'
          placeholder='Upload your introduction video'
          rightSection={<IconVideo stroke={1.5} />}
          rightSectionPointerEvents='none'
          accept='video/*'
          required
          key={form.key('video')}
          {...form.getInputProps('video')}
        />
      </div>
      <Button
        className='mt-4'
        leftSection={<IconCheck size={16} />}
        type='submit'
      >
        Update Profile
      </Button>
    </form>
  );
}
