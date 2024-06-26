import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { FetchTopics } from '../model';
import { tutorService } from '../service';

export const useTopics = (): UseQueryResult<FetchTopics> => {
  return useQuery<FetchTopics>({
    queryKey: ['getTopics'],
    queryFn: tutorService.getTopics,
  });
};
