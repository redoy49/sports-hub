import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, isAuthLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data = { role: "user" },
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !isAuthLoading && !!user?.email,
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user?.email}/role`);
      return response.data; // Ensure backend sends: { role: 'admin' } or similar
    },
  });

  return {
    role: data.role,
    roleLoading: isAuthLoading || roleLoading,
    refetchRole: refetch, // Giving it a clear name
  };
};

export default useUserRole;
