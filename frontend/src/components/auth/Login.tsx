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
import { useLocation, useNavigate } from 'react-router';
import { ROLE } from '../../constant';
import { useAuth } from '../../hooks';
import { setUserInfoToLocalStorage } from '../../util/userInfo';

export function Login() {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // to go back to same page after login instead of going to home page
  const fromPath = location.state?.from || '/';

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
        <form
          onSubmit={form.onSubmit((values) => {
            // todo implement proper login
            console.log(values);
            const auth = {
              id: 123,
              name: 'hello@hello.com',
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTUyYjJkNzk1ZDNkZTU0MWZmNDlhODYiLCJpYXQiOjE1ODI0NzgwNTd9.VQ6kqsSCYuQ7f5OHRJkwDvN5_QLgdMeK5jKfk_BZczc',
              role: ROLE.STUDENT,
              profileImgLink: 'blah.com',
            };
            setUserInfoToLocalStorage(auth);
            setAuth(auth);
            navigate(fromPath, { replace: true });
          })}
        >
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
