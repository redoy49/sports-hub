// components/AdminProfile.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: admin = {}, isLoading: loadingAdmin } = useQuery({
    queryKey: ['admin', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  const { data: courts = [] } = useQuery({
    queryKey: ['courts'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const totalMembers = users.filter(u => u.role === 'member').length;

  if (loadingAdmin) return <span className="loading loading-spinner"></span>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-xl p-6">
      <div className="flex flex-col items-center mb-6">
        <img src={admin.image} alt="Admin" className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold">{admin.name}</h2>
        <p className="text-gray-600">{admin.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-xl">
          <h4 className="text-lg font-semibold">Total Courts</h4>
          <p className="text-2xl">{courts.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl">
          <h4 className="text-lg font-semibold">Total Users</h4>
          <p className="text-2xl">{users.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl">
          <h4 className="text-lg font-semibold">Total Members</h4>
          <p className="text-2xl">{totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
