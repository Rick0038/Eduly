import { Button, Group } from '@mantine/core';
import { IconArrowRight, IconDownload, IconPhoto } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import edulyApiClient from '../util/network';

export default function Demo() {
  const getHelloWorld = async () => {
    const response = await edulyApiClient.get<{ msg: string }>('/hello-world');
    return response.data;
  };

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['helloWorld'],
    queryFn: getHelloWorld,
  });

  return (
    <Group justify='center'>
      {isLoading && <p>Loading ...</p>}
      {isSuccess && <pre>{data.msg}</pre>}
      <Button leftSection={<IconPhoto size={14} />} variant='default'>
        Gallery
      </Button>

      <Button rightSection={<IconDownload size={14} />}>Download</Button>

      <Button
        variant='light'
        leftSection={<IconPhoto size={14} />}
        rightSection={<IconArrowRight size={14} />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}
