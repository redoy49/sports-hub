// components/AdminProfile.jsx
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaUsers, FaTableTennis, FaUserCheck } from "react-icons/fa";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: admin = {}, isLoading: loadingAdmin } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  const { data: courts = [] } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts`);
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const totalMembers = users.filter((u) => u.role === "member").length;

  if (loadingAdmin) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl px-6 py-24">
      <div className="flex flex-col items-center mb-6">
        <img
          src={admin.image}
          alt="Admin"
          className="w-24 h-24 rounded-full mb-4 ring-4 ring-blue-300"
        />
        <h2 className="text-2xl font-semibold">{admin.name}</h2>
        <p className="text-gray-700">{admin.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-50 p-5 rounded-xl flex flex-col items-center space-y-2">
          <FaTableTennis className="text-blue-600 text-3xl" />
          <h4 className="text-lg font-semibold text-blue-700">Total Courts</h4>
          <p className="text-3xl font-bold text-blue-900">{courts.length}</p>
        </div>

        <div className="bg-green-50 p-5 rounded-xl flex flex-col items-center space-y-2">
          <FaUsers className="text-green-600 text-3xl" />
          <h4 className="text-lg font-semibold text-green-700">Total Users</h4>
          <p className="text-3xl font-bold text-green-900">{users.length}</p>
        </div>

        <div className="bg-purple-50 p-5 rounded-xl flex flex-col items-center space-y-2">
          <FaUserCheck className="text-purple-600 text-3xl" />
          <h4 className="text-lg font-semibold text-purple-700">
            Total Members
          </h4>
          <p className="text-3xl font-bold text-purple-900">{totalMembers}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
