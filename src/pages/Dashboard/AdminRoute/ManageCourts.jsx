import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageCourts = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  // ⏬ Use TanStack Query to fetch courts
  const {
    data: courts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axiosInstance.delete(`/courts/${id}`);
        toast.success("Court deleted");
        queryClient.invalidateQueries(["courts"]);
      } catch (err) {
        console.error(err);
        toast.error("Delete failed");
      }
    }
  };

  const handleAddCourt = async () => {
    const newCourt = {
      name: "New Court",
      type: "Tennis",
      price: 100,
      image: "https://via.placeholder.com/150",
    };
    try {
      await axiosInstance.post("/courts", newCourt);
      toast.success("New court added");
      queryClient.invalidateQueries(["courts"]);
    } catch (err) {
      console.error(err);
      toast.error("Add court failed");
    }
  };

  const handleUpdate = async (id) => {
    const name = prompt("Enter new court name");
    const price = Number(prompt("Enter new price"));

    if (!name || isNaN(price)) {
      toast.error("Invalid input for update");
      return;
    }

    const updatedCourt = { name, price };

    try {
      await axiosInstance.patch(`/courts/${id}`, updatedCourt);
      toast.success("Court updated");
      queryClient.invalidateQueries(["courts"]);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Courts</h2>
        <button onClick={handleAddCourt} className="btn btn-success btn-sm flex items-center gap-2">
          <FaPlus /> Add Court
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner/>
      ) : isError ? (
        <p className="text-red-500">Failed to load courts</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courts.map((court) => (
                <tr key={court._id}>
                  <td>
                    <img src={court.image} alt={court.name} className="w-20 h-12 object-cover" />
                  </td>
                  <td>{court.name}</td>
                  <td>{court.type}</td>
                  <td>${court.price}</td>
                  <td className="flex gap-2">
                    <button onClick={() => handleUpdate(court._id)} className="btn btn-sm btn-info">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(court._id)} className="btn btn-sm btn-error">
                      <FaTrash />
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

export default ManageCourts;
