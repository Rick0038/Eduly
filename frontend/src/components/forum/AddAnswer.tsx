import { Button, Modal, Stack, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { forumService } from '../../service/ForumService';
import { notificationService } from '../../service/NotificationService';

export const AddAnswer: FC<{ questionId: number; onAddAnswer: () => void }> = ({
  questionId,
  onAddAnswer,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const postQuestionMutation = useMutation({
    mutationFn: forumService.postAnswer,
    onSuccess: () => {
      notificationService.showSuccess({
        message: 'Answer posted successfully',
      });
      onAddAnswer();
      form.reset();
      close();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const form = useForm({
    initialValues: {
      description: '',
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title='Add Answer' centered>
        <form
          onSubmit={form.onSubmit((values) =>
            postQuestionMutation.mutate({ ...values, questionId })
          )}
        >
          <Stack>
            <Textarea
              label='Answer'
              placeholder='Write your answer here...'
              required
              withAsterisk={false}
              autosize
              minRows={4}
              {...form.getInputProps('text')}
            />
          </Stack>
          <Button type='submit' fullWidth mt='xl'>
            Submit
          </Button>
        </form>
      </Modal>
      <Button onClick={open} leftSection={<IconPlus />}>
        Add Answer
      </Button>
    </>
  );
};
