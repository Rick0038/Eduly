import {
  Button,
  Container,
  NativeSelect,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function Login() {
  const form = useForm({
    initialValues: {
      role: 'Tutor',
      email: '',
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
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta='center'>Welcome back!</Title>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Stack>
            <NativeSelect
              label='Role'
              data={['Tutor', 'Student', 'Admin']}
              required
              {...form.getInputProps('role')}
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
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
