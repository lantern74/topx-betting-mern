import { useMutation } from '@tanstack/react-query';
import { api, handleApiError } from '../utils/api';

const useRegisterSubAdmin = () => {
  return useMutation({
    mutationFn: async (subAdminData) => {
      try {
        const response = await api.post('/admin/register-subadmin', subAdminData);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
};

export default useRegisterSubAdmin;
