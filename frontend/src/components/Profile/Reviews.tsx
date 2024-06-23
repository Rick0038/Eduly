import { Avatar, Card, Flex, Group, Rating, Text } from '@mantine/core';
import { Tutor } from '../../model';

interface ReviewsProps {
  user: Tutor;
}

export function Reviews(props: ReviewsProps) {
  const { user } = props;

  return (
    <Group className='flex-col content-start mt-2'>
      <div className='sm:ml-2 w-full'>
        <Text>Overall rating:</Text>
        <Flex align='center' gap='xs'>
          <Rating value={user.rating} fractions={2} readOnly size='lg' />
          <Text size='lg' w={500}>
            {user.rating.toFixed(1)} / 5
          </Text>
        </Flex>
        <Text size='sm' c='dimmed'>
          Based on {user.numberOfRatings} reviews
        </Text>
      </div>
      <div className='w-full'>
        {user.reviews.map((review) => (
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
    </Group>
  );
}
