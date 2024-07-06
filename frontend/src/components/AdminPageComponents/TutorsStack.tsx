import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Menu,
  rem,
  Stack,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import {
  IconBan,
  IconCheck,
  IconDots,
  IconExternalLink,
  IconX,
} from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { adminService } from '../../service';
import { notificationService } from '../../service/NotificationService';

export function TutorsStack() {
  const {
    data: tutorData,
    isLoading,
    isError,
    refetch: refetchTutorData,
  } = useQuery({
    queryKey: ['getTutorContent'],
    queryFn: adminService.getTutorContent,
  });

  const approveContentMutation = useMutation({
    mutationFn: adminService.approveTutorContent,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Content approved to go live.',
      });
      refetchTutorData();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const contentTypeColors: Record<string, string> = {
    profile_image: 'blue',
    intro_video: 'cyan',
    cv: 'pink',
  };

  const rejectContentMutation = useMutation({
    mutationFn: adminService.rejectTutorContent,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Content rejected from going live.',
      });
      refetchTutorData();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const banTutorMutation = useMutation({
    mutationFn: adminService.banTutor,
    onSuccess: () => {
      notificationService.showSuccess({
        title: 'Success',
        message: 'Tutor banned from making new requests.',
      });
      refetchTutorData();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  return (
    <>
      {isLoading && (
        <Container>
          <Center style={{ height: 'calc(100vh - 120px)' }}>
            <Loader type='bars'></Loader>
          </Center>
        </Container>
      )}
      {isError && (
        <Container>
          <Text ta='center'>
            An error occurred while fetching tutor contents.
          </Text>
        </Container>
      )}
      {tutorData && tutorData?.content.length == 0 && (
        <Container my={20}>
          <Text ta='center'>
            There is no content awaiting your approval. You are all caught up!
          </Text>
        </Container>
      )}
      {tutorData && tutorData?.content.length != 0 && (
        <Table verticalSpacing='md'>
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta={'center'}>Name</Table.Th>
              <Table.Th ta={'center'}>Content Type</Table.Th>
              <Table.Th ta={'center'}>Content</Table.Th>
              <Table.Th ta={'right'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tutorData?.content.map((item) => (
              <Table.Tr key={item.id}>
                <Table.Td>
                  <Stack gap={'sm'}>
                    <Text fz='sm' fw={500}>
                      {item.tutorName}
                    </Text>
                    <Text c='dimmed' fz='xs'>
                      #{item.tutorId}
                    </Text>
                  </Stack>
                </Table.Td>

                <Table.Td>
                  <Center>
                    <Badge color={contentTypeColors[item.type]} variant='light'>
                      {item.type.replace('_', ' ')}
                    </Badge>
                  </Center>
                </Table.Td>

                <Table.Td>
                  <Center>
                    <Button
                      size='xs'
                      radius={'xl'}
                      variant={'light'}
                      component={'a'}
                      target='_blank'
                      href={item.link}
                      rightSection={<IconExternalLink size={14} />}
                    >
                      View
                    </Button>
                  </Center>
                </Table.Td>

                <Table.Td>
                  <Group gap={10} justify='flex-end'>
                    <Tooltip
                      label={'Approve'}
                      transitionProps={{ transition: 'scale', duration: 300 }}
                    >
                      <ActionIcon
                        variant='subtle'
                        color='green'
                        onClick={() => {
                          approveContentMutation.mutate(item.id);
                        }}
                      >
                        <IconCheck stroke={1.5} />
                      </ActionIcon>
                    </Tooltip>
                    <Menu
                      transitionProps={{ transition: 'scale-y' }}
                      withArrow
                      position='bottom-end'
                      withinPortal
                    >
                      <Menu.Target>
                        <ActionIcon variant='subtle' color='gray'>
                          <IconDots stroke={1.5} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={
                            <IconX
                              style={{ width: rem(16), height: rem(16) }}
                              stroke={1.5}
                            />
                          }
                          onClick={() => {
                            rejectContentMutation.mutate(item.id);
                          }}
                        >
                          Reject
                        </Menu.Item>
                        <Menu.Item
                          leftSection={
                            <IconBan
                              style={{ width: rem(16), height: rem(16) }}
                              stroke={1.5}
                            />
                          }
                          onClick={() => {
                            banTutorMutation.mutate(item.tutorId);
                          }}
                          color='red'
                        >
                          Ban tutor
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </>
  );
}
