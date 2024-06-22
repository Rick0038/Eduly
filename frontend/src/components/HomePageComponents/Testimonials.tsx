import {
  Badge,
  Card,
  Group,
  Image,
  Text,
  Title,
  Paper,
  SegmentedControl,
  Center,
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
} from '@tabler/icons-react';

const testimonialData = [
  {
    name: 'Emma Johnson',
    feedback:
      'Eduly has been a game-changer for me! The variety of tutors available is incredible, and the seamless online sessions have made learning so much easier. Highly recommended!',
    age: 21,
    portrait: 'emmaJohnson.png',
  },
  {
    name: 'Liam Williams',
    feedback:
      'I was struggling with my calculus course, but thanks to Eduly, I found a tutor who explained everything so clearly. My grades have improved significantly!',
    age: 17,
    portrait: 'liamWilliams.png',
  },
  {
    name: 'Olivia Brown',
    feedback:
      "The personalized tutor matching feature on Eduly is fantastic. I was able to find a tutor who perfectly suited my learning style and schedule. I couldn't be happier!",
    age: 29,
    portrait: 'oliviaBrown.png',
  },
  {
    name: 'Noah Davis',
    feedback:
      "Eduly's community forums are a great resource. I've learned so much by interacting with other students and tutors. It's a supportive and engaging platform!",
    age: 34,
    portrait: 'noahDavis.png',
  },
  {
    name: 'Sophia Martinez',
    feedback:
      'Booking sessions is so easy with Eduly. The real-time availability calendar and session reminders have been a lifesaver. The platform is user-friendly and efficient.',
    age: 22,
    portrait: 'sophiaMartinez.png',
  },
  {
    name: 'James Anderson',
    feedback:
      "The quality of tutors on Eduly is outstanding. Each tutor I've worked with has been knowledgeable and patient. It's a great investment in my education.",
    age: 26,
    portrait: 'jamesAnderson.png',
  },
  {
    name: 'Isabella Taylor',
    feedback:
      'Eduly has helped me connect with amazing tutors from around the world. The platform is easy to use, and the support team is always helpful. I highly recommend it!',
    age: 24,
    portrait: 'isabellaTaylor.png',
  },
  {
    name: 'Ethan Thompson',
    feedback:
      "I love how Eduly integrates everything in one place. From finding a tutor to attending sessions and leaving reviews, it's all so streamlined and convenient. I love it!",
    age: 19,
    portrait: 'ethanThompson.png',
  },
  {
    name: 'Mia Harris',
    feedback:
      "Eduly's tutor profiles are very detailed. Watching introductory videos and reading CVs helped me make an informed decision. The tutors are top-notch!",
    age: 18,
    portrait: 'miaHarris.png',
  },
  {
    name: 'Benjamin Clark',
    feedback:
      "Thanks to Eduly, I found a tutor who has been instrumental in my learning journey. The platform's features make the whole process of learning so much better.",
    age: 32,
    portrait: 'benjaminClark.png',
  },
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  });

  const [playTestimonials, setPlayTestimonials] = useState('play');

  const testimonials = testimonialData.map((testimonial) => (
    <Card
      key={testimonial.name}
      maw={300}
      shadow='sm'
      m={10}
      padding='lg'
      radius='md'
      withBorder
    >
      <Card.Section>
        <Image
          src={'HomepageImages/' + testimonial.portrait}
          height={160}
          alt='Testimonial Person Image'
        />
      </Card.Section>

      <Group justify='space-between' mt='md' mb='xs'>
        <Text fw={500}>{testimonial.name}</Text>
        <Badge>Aged {testimonial.age}</Badge>
      </Group>

      <Text fs={'italic'} size='sm' c='dimmed'>
        “{testimonial.feedback}”
      </Text>
    </Card>
  ));

  return (
    <Paper ref={ref} mt={10} withBorder>
      <Title order={1} ta='center' my={'md'}>
        Look at what our members have to say...
      </Title>
      <Marquee
        play={
          playTestimonials === 'play' && entry?.isIntersecting ? true : false
        }
      >
        {testimonials}
      </Marquee>
      <Center my={10}>
        <SegmentedControl
          size={'xs'}
          radius={'xl'}
          value={playTestimonials}
          onChange={setPlayTestimonials}
          data={[
            { label: <IconPlayerPlayFilled />, value: 'play' },
            { label: <IconPlayerPauseFilled />, value: 'pause' },
          ]}
        />
      </Center>
    </Paper>
  );
}
