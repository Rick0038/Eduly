import {
  Button,
  Container,
  Paper,
  PasswordInput,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function SignUp() {
  const form = useForm({
    initialValues: {
      role: 'Tutor',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },

    validate: {
      email: (val) => {
        if (!/^\S+@\S+$/.test(val)) {
          return 'Invalid email';
        }
        if (!val.endsWith('hs-fulda.de')) {
          return 'Email should end with hs-fulda.de';
        }
        return null;
      },
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta='center'>Join us!</Title>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <SegmentedControl
              data={['Tutor', 'Student']}
              {...form.getInputProps('role')}
            />
            <TextInput
              label='First name'
              placeholder='First name'
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label='Last name'
              placeholder='Last name'
              required
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label='Email'
              placeholder='Your email'
              required
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              required
              {...form.getInputProps('password')}
            />
          </Stack>

          <Button type='submit' fullWidth mt='xl'>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
