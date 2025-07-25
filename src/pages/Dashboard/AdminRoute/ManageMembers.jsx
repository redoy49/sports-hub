import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const fetchMembers = async (axiosSecure) => {
  const res = await axiosSecure.get("/members");
  return res.data;
};

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembers(axiosSecure),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/members/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "The member has been deleted.", "success");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => toast.error("Failed to delete member"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-full mx-auto border border-gray-200 px-4 py-6 mt-16 lg:mt-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        👥 Manage Members
      </h2>

      {/* Custom Search Input */}
      <div className="search-input-container w-full md:w-80 flex-shrink-0 relative mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input w-full bg-white border border-gray-300 text-gray-700 rounded-full shadow-xs leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm pl-6 pr-4 py-2"
          value={search}
          onChange={handleSearch}
        />
        <i className="fas fa-search absolute left-3 top-2.5 text-gray-500 text-sm"></i>
      </div>

      {/* Data Display */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center text-gray-500 italic">
          No members found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-blue-50 text-sm font-semibold text-gray-700">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member._id}
                  className="hover:bg-base-100 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
