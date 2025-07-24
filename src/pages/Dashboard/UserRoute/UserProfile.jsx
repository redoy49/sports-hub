// components/UserProfile.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner/>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6">
      <div className="flex flex-col items-center">
        <img src={userData.image} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>
        <p className="mt-4 text-sm text-gray-500">
          Registered on: <strong>{new Date(userData.createdAt).toLocaleDateString()}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
