import { useMutation } from "@tanstack/react-query";
import { api, handleApiError } from "../utils/api";

const useRegisterMember = () => {
  return useMutation({
    mutationFn: async (memberData) => {
      try {
        const response = await api.post("/admin/register-member", memberData);
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
  });
};

export default useRegisterMember;
