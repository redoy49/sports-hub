import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-1">
        👤 All Users
      </h2>

      {/* Styled Search Bar */}
      <div className="search-input-container w-full md:w-80 flex-shrink-0 relative mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-700 rounded-full shadow-xs leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm pl-6 pr-4 py-2"
        />
        <i className="fas fa-search absolute left-3 top-2.5 text-gray-500 text-sm"></i>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-base-100 transition-colors"
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`font-medium btn btn-xs md:btn-sm text-white capitalize ${
                      user.role === "admin"
                        ? "bg-blue-400"
                        : user.role === "member"
                        ? "bg-green-400"
                        : "bg-yellow-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="text-sm text-gray-600">
                  {new Date(user.lastLogin).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
