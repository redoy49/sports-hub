// components/MemberProfile.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: member = {}, isLoading } = useQuery({
    queryKey: ['member', user?.email],
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
        <img src={member.image} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-gray-600">{member.email}</p>
        <p className="mt-4 text-sm text-gray-500">
          Became member on: <strong>{new Date(member.membershipDate).toLocaleDateString()}</strong>
        </p>
      </div>
    </div>
  );
};

export default MemberProfile;
