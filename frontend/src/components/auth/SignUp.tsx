import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ROLE } from '../../constant';
import { authService } from '../../service/AuthService';
import { notificationService } from '../../service/NotificationService';

export function SignUp() {
  const [searchParams] = useSearchParams();

  const form = useForm({
    initialValues: {
      role: searchParams.get('role') || ROLE.TUTOR,
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
      notificationService.showSuccess({
        message: 'Account created successfully. Redirecting to login ...',
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta='center'>Join us!</Title>

      <Text c='dimmed' size='sm' ta='center' mt={5}>
        Already have an account?
        <Anchor
          style={{ marginLeft: '5px' }}
          size='sm'
          component='button'
          onClick={() => navigate('/login')}
        >
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit((values) => registerMutation.mutate(values))}
        >
          <Stack>
            <SegmentedControl
              data={[
                { value: ROLE.TUTOR, label: 'Tutor' },
                { value: ROLE.STUDENT, label: 'Student' },
              ]}
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
