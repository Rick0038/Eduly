import { Button, Modal, Rating, Stack, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { notificationService } from '../../service/NotificationService';
import { studentService } from '../../service/StudentService';

export const AddReview: FC<{ tutorId: number; onAddReview: () => void }> = ({
  tutorId,
  onAddReview,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const addReviewMutation = useMutation({
    mutationFn: studentService.writeReview,
    onSuccess: () => {
      notificationService.showSuccess({
        message: 'Review Added Successfully',
      });
      onAddReview();
      form.reset();
      close();
    },
    onError: (err) => {
      notificationService.showError({ err });
    },
  });

  const form = useForm({
    initialValues: {
      rating: 0,
      text: '',
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title='Review' centered>
        <form
          onSubmit={form.onSubmit((values) =>
            addReviewMutation.mutate({ tutorId, ...values })
          )}
        >
          <Stack>
            <Rating {...form.getInputProps('rating')} />
            <Textarea
              label='Your Comments'
              placeholder='Enter your review here...'
              required
              withAsterisk={false}
              autosize
              minRows={4}
              {...form.getInputProps('text')}
            />
          </Stack>
          <Button
            disabled={!form.values.rating}
            type='submit'
            fullWidth
            mt='xl'
          >
            Submit
          </Button>
        </form>
      </Modal>
      <Button onClick={open}>Add Your Review</Button>
    </>
  );
};
