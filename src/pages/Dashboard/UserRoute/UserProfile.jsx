// components/UserProfile.jsx
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl px-6 py-24">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 ring-4 ring-blue-300"
        />
        <h2 className="text-2xl font-semibold">{userData.name}</h2>
        <p className="text-gray-700">{userData.email}</p>
      </div>
      <p className="text-sm text-gray-500 text-center">
        Registered on:{" "}
        <strong>{new Date(userData.createdAt).toLocaleDateString()}</strong>
      </p>
    </div>
  );
};

export default UserProfile;
