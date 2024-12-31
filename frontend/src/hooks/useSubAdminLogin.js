import { useMutation } from '@tanstack/react-query';
import { api, handleApiError } from '../utils/api';
import Cookies from 'js-cookie';

const useSubAdminLogin = () => {
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await api.post('/admin/login', credentials);
         if (response.status === 200) {
          Cookies.set('sessionId', response.data.sessionId, {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
        }
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });

  return { mutateAsync, isLoading, error };
};

export default useSubAdminLogin;
