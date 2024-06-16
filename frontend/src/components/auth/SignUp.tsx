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
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ROLE } from '../../constant';
import { authService } from '../../service/AuthService';

export function SignUp() {
  const form = useForm({
    initialValues: {
      role: ROLE.TUTOR,
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

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Account created successfully. Redirecting to login ...',
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    },
    onError: (err) => {
      console.error(err);
      notifications.show({
        title: 'Error',
        message: 'An error occurred when creating account.',
      });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta='center'>Join us!</Title>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit((values) => registerMutation.mutate(values))}
        >
          <Stack>
            <SegmentedControl
              data={[ROLE.TUTOR, ROLE.STUDENT]}
              {...form.getInputProps('role')}
            />
            <TextInput
              label='First name'
              placeholder='First name'
              required
              withAsterisk={false}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label='Last name'
              placeholder='Last name'
              required
              withAsterisk={false}
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label='Email'
              placeholder='Your email'
              required
              withAsterisk={false}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='Password'
              placeholder='Your password'
              required
              withAsterisk={false}
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
