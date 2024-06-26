import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconDeviceLaptop,
  IconMessageCircle,
  IconUserSearch,
} from '@tabler/icons-react';
import classes from './FeatureCards.module.css';

const featureData = [
  {
    title: 'Find Your Ideal Tutor',
    description:
      'Advanced search filters and personalized recommendations help students find the perfect tutor based on pricing, ratings, availability, topics, and languages of instruction.',
    icon: IconUserSearch,
  },
  {
    title: 'Seamless Online Sessions',
    description:
      'Seamlessly conduct tutoring sessions with your BigBlueButton account (provided by HS Fulda) and also benefit from the real-time availability calendar.',
    icon: IconDeviceLaptop,
  },
  {
    title: 'Engage and Connect',
    description:
      'Engage with a collaborative community, ask questions, share knowledge, and communicate directly with tutors through secure in-app messaging and a robust review system.',
    icon: IconMessageCircle,
  },
];

export function FeatureCards() {
  const theme = useMantineTheme();
  const features = featureData.map((feature) => (
    <Card
      key={feature.title}
      shadow='md'
      radius='md'
      className={classes.card}
      padding='xl'
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.violet[6]}
      />
      <Text fz='lg' fw={500} className={classes.cardTitle} mt='md'>
        {feature.title}
      </Text>
      <Text fz='sm' c='dimmed' mt='sm'>
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size='lg' py='xl'>
      <Group justify='center'>
        <Badge variant='filled' size='lg'>
          Why Eduly?
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta='center' mt='sm'>
        Focus on your studies, leave the search to us!
      </Title>

      <Text c='dimmed' className={classes.description} ta='center' mt='md'>
        With Eduly's industry leading features, you can better utilize your time
        by learning new skills rather than wasting your time in shuffling
        between bad tutors. We are here to connect you to the best tutors at
        Fulda..
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing='xl' mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
