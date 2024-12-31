import { useQuery } from '@tanstack/react-query';
import { api, handleApiError } from '../utils/api';

const useGetMatchResult = (id) => {
  return useQuery({
    queryKey: ['matchResult', id],
    queryFn: async () => {
      try {
        const response = await api.get(`/match/match-result/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    enabled: !!id, // Only run the query if an ID is provided
    staleTime: 60000, // 1 minute
  });
};

export default useGetMatchResult;
