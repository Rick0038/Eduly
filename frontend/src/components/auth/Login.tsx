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
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { ROLE } from '../../constant';
import { authService } from '../../service/AuthService';
import { setUserInfoToLocalStorage } from '../../util/userInfo';

export function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // to go back to same page after login instead of going to home page
  const fromPath = location.state?.from || '/';

  const form = useForm({
    initialValues: {
      role: ROLE.TUTOR,
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

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUserInfoToLocalStorage(data);
      navigate(fromPath, { replace: true });
    },
    onError: (err) => {
      console.error(err);
      notifications.show({
        title: 'Error',
        message: 'Invalid Credentials or Server Error!',
      });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta='center'>Welcome back!</Title>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form
          onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
        >
          <Stack>
            <NativeSelect
              label='Role'
              data={[ROLE.TUTOR, ROLE.STUDENT, ROLE.ADMIN]}
              required
              withAsterisk={false}
              {...form.getInputProps('role')}
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
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
