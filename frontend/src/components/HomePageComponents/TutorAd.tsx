import { Title, Text, Container, Button, Overlay, Paper } from '@mantine/core';
import classes from './TutorAd.module.css';

export function TutorAd() {
  return (
    <Paper mt={10}>
      <div className={classes.wrapper}>
        <Overlay color='#000' opacity={0.65} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>Are you a tutor?</Title>

          <Container size={640}>
            <Text size='lg' className={classes.description}>
              By joining Eduly, you become part of a dynamic and knowledgeable
              community dedicated to the exchange of expertise. We recognize the
              value of your hard work and allow you to set your own hourly rates
              for tutoring. Our platform will facilitate the connection with
              students who are eager to benefit from your guidance.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button className={classes.control} variant='white' size='lg'>
              Get started
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}
