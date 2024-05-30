import { useQuery } from '@tanstack/react-query';
import { Tutor } from '../model';
import edulyApiClient from '../util/network';
import TutorCard from './TutorCard';

export default function Demo() {
  const getHelloWorld = async () => {
    const response = await edulyApiClient.get<{ msg: string }>('/hello-world');
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ['helloWorld'],
    queryFn: getHelloWorld,
  });

  console.log(data);

  const tutor: Tutor = {
    id: '12345',
    name: 'John Doe',
    pricing: 40,
    rating: 4.7,
    numberOfRatings: 100,
    topic: 'Math',
    language: 'English',
    experience: 5,
    intro:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus ante, tempus blandit augue vitae, molestie venenatis est. Nunc molestie tellus quis efficitur sagittis. Nulla eu laoreet arcu, non sodales. ',
    numLessonsTaught: 10,
    profileImgLink:
      'https://avatars.preply.com/i/logos/i/logos/avatar_ngykk0ma7y.jpg',
  };

  return <TutorCard tutor={tutor} />;
}
