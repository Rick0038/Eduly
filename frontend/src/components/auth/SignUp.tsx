import {
  Anchor,
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Popover,
  Progress,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { ROLE } from '../../constant';
import { authService } from '../../service/AuthService';
import { notificationService } from '../../service/NotificationService';

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size='sm'
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{' '}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export function SignUp() {
  const [searchParams] = useSearchParams();
  const [popoverOpened, setPopoverOpened] = useState(false);

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

  const strength = getStrength(form.values.password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

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

            {/* Fancy password with strength meter */}

            <Popover
              opened={popoverOpened}
              position='bottom'
              width='target'
              transitionProps={{ transition: 'pop' }}
            >
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <PasswordInput
                    label='Password'
                    placeholder='Your password'
                    required
                    withAsterisk={false}
                    {...form.getInputProps('password')}
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb='xs' />
                <PasswordRequirement
                  label='Includes at least 6 characters'
                  meets={form.values.password.length > 5}
                />
                {checks}
              </Popover.Dropdown>
            </Popover>
          </Stack>

          <Button type='submit' fullWidth mt='xl'>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
