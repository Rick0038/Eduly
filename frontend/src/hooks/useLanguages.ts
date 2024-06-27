import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { FetchLanguages } from '../model';
import { tutorService } from '../service';

export const useLanguages = (): UseQueryResult<FetchLanguages> => {
  return useQuery<FetchLanguages>({
    queryKey: ['getLanguages'],
    queryFn: tutorService.getLanguages,
  });
};
