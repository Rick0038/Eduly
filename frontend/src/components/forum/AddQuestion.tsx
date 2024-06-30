import { Button, Modal, Stack, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { forumService } from '../../service/ForumService';
import { notificationService } from '../../service/NotificationService';

export const AddQuestion: FC<{ onAddQuestion: () => void }> = ({
  onAddQuestion,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const postQuestionMutation = useMutation({
    mutationFn: forumService.postQuestion,
    onSuccess: () => {
      notificationService.showSuccess({
        message: 'Question Posted Successfully!',
      });
      onAddQuestion();
      form.reset();
      close();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add question' centered>
        <form
          onSubmit={form.onSubmit((values) =>
            postQuestionMutation.mutate(values)
          )}
        >
          <Stack>
            <TextInput
              label='Title'
              placeholder='Enter question title'
              required
              withAsterisk={false}
              {...form.getInputProps('title')}
            />
            <Textarea
              label='Description'
              placeholder='Explain your question with more details here...'
              required
              withAsterisk={false}
              autosize
              minRows={4}
              {...form.getInputProps('description')}
            />
          </Stack>
          <Button type='submit' fullWidth mt='xl'>
            Submit
          </Button>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />}>
        Ask Question
      </Button>
    </>
  );
};
