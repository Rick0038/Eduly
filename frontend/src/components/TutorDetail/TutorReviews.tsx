import { Avatar, Card, Flex, Group, Rating, Stack, Text } from '@mantine/core';
import { FC } from 'react';
import { TutorDetailResponse } from '../../service/StudentService';
import { AddReview } from './AddReview';

export const TutorReviews: FC<{
  tutorDetail: TutorDetailResponse;
  onAddReview: () => void;
}> = ({ tutorDetail, onAddReview }) => {
  return (
    <Stack style={{ padding: '10px' }}>
      <Group>
        <div className='sm:ml-2 w-full'>
          <Text>Overall rating:</Text>
          <Flex align='center' gap='xs'>
            <Rating
              value={tutorDetail.rating}
              fractions={2}
              readOnly
              size='lg'
            />
            <Text size='lg' w={500}>
              {tutorDetail.rating.toFixed(1)} / 5
            </Text>
          </Flex>
          <Text size='sm' c='dimmed'>
            Based on {tutorDetail.numberOfRatings} reviews
          </Text>
        </div>
        <div>
          <AddReview tutorId={tutorDetail.id} onAddReview={onAddReview} />
        </div>
      </Group>

      <div className='w-full'>
        {tutorDetail.reviews.map((review) => (
          <Card
            key={review.id}
            shadow='sm'
            padding='md'
            className='mb-4 border'
          >
            <Group>
              <Avatar src={review.reviewBy.profileImgLink} radius='xl' />
              <div>
                <Text w={500}>{review.reviewBy.name}</Text>
                <Rating value={review.rating} readOnly size='sm' />
              </div>
            </Group>
            <Text className='mt-2'>{review.text}</Text>
          </Card>
        ))}
      </div>
    </Stack>
  );
};
