import { Container, Title, Text, Button } from '@mantine/core';
import classes from './HomepageHero.module.css';

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size='lg'>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Find the{' '}
              <Text
                component='span'
                inherit
                variant='gradient'
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                perfect
              </Text>{' '}
              tutor for your needs
            </Title>

            <Text className={classes.description} mt={30}>
              Unlock your potential with Eduly. Discover expert tutors in
              diverse fields, ready to guide you on your academic journey. Join
              our thriving community at Fulda, where hundreds of tutors and
              satisfied students meet to achieve greatness.
            </Text>

            <Button
              variant='gradient'
              gradient={{ from: 'pink', to: 'yellow' }}
              size='xl'
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
