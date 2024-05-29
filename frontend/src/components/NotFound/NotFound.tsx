import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Illustration } from './Illustration';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c='dimmed'
            size='lg'
            ta='center'
            className={classes.description}
          >
            The page you are trying to open does not exist. You may have
            mistyped the address, or the page has been moved to another URL.
          </Text>
          <Group justify='center'>
            <Link to={'/'}>
              <Button size='md'>Take me back to home page</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
