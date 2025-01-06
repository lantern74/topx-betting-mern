import { useQuery } from "@tanstack/react-query";
import { api, handleApiError } from "../utils/api";

const useGetAllSubAdmins = () => {
  return useQuery({
    queryKey: ["subadmins"],
    queryFn: async () => {
      try {
        const response = await api.get("/admin/subadmins");
        return response.data;
      } catch (error) {
        throw new Error(handleApiError(error));
      }
    },
    staleTime: 60000, // 1 minute
  });
};

export default useGetAllSubAdmins;
