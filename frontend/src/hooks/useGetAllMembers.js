import { useQuery } from '@tanstack/react-query';
import { api, handleApiError } from '../utils/api';

const useGetAllMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      try {
        const response = await api.get('/admin/members');
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    staleTime: 60000, // 1 minute
  });
};

export default useGetAllMembers;
