import { useMutation } from '@tanstack/react-query';
import { api, handleApiError } from '../utils/api';

const useSubAdminLogin = () => {
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await api.post('/admin/login', credentials);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });

  return { mutateAsync, isLoading, error };
};

export default useSubAdminLogin;
