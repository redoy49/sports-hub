import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const fetchMembers = async (axiosSecure, name) => {
  const res = await axiosSecure.get(`/members?name=${name}`);
  return res.data;
};

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members", search],
    queryFn: () => fetchMembers(axiosSecure, search),
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
    const name = e.target.value;
    setSearch(name);
    refetch(); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 w-full max-w-sm"
        value={search}
        onChange={handleSearch}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : members.length === 0 ? (
        <div className="text-center text-gray-500">No members found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member._id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                  <td>
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
